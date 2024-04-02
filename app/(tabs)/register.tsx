import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Icons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Pressable, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RegisterStyles } from '../../src/styles/register';
import InputController from '../../src/components/Register/input-controller';

interface FormData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  cep: string;
  city: string;
  address: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Obrigatório o nome do time'),
  phone: yup
    .string()
    .required('Telefone obrigatório')
    .min(12, 'Precisa ter no mínimo 12 digitos: DDD912345678'),
  email: yup
    .string()
    .required('Email obrigatório')
    .min(6, 'Informe um email com no mínimo 6 digitos')
    .email('Informe email válido'),
  cep: yup
    .string()
    .min(8, 'O cep deve ter no mínimo 8 digitos')
    .max(8, 'O cep deve ter no máximo 8 digitos')
    .required('É obrigatório ter o CEP'),
  city: yup.string().required('É obrigatório ter a cidade'),
  address: yup.string().required('É obrigatório ter a rua'),
});

const register = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const initialValues = {
    id: '',
    name: '',
    phone: '',
    email: '',
    cep: '',
    city: '',
    address: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const recuperarTimes = async (key: string) => {
    try {
      const valor = await AsyncStorage.getItem(key);
      if (valor !== null) {
        return valor;
      }
    } catch (erro) {
      return null;
    }
  };

  const loadTeams = () => {
    recuperarTimes('teams')
      .then((data) => data)
      .then((value) => {
        const parsedTeams = value ? JSON.parse(value) : [];

        if (parsedTeams.length) {
          const findedTeam = parsedTeams.find(
            (team: {
              name: string;
              id: string;
              phone: string;
              email: string;
              cep: string;
              city: string;
              address: string;
            }) => team.id === id
          );

          Object.entries(findedTeam).forEach(([key, value]) =>
            setValue(
              key as
                | 'name'
                | 'phone'
                | 'email'
                | 'cep'
                | 'city'
                | 'address'
                | 'id',
              value as string
            )
          );
        }
      });
  };

  useEffect(() => {
    if (id) {
      console.log(id);
      loadTeams();
    }
  }, [id]);

  const searchCep = async () => {
    try {
      const cepValue = control._formValues.cep;

      const response = await axios({
        method: 'GET',
        url: `http://www.viacep.com.br/ws/${cepValue}/json/`,
      });
      setValue('city', response.data?.localidade);
      setValue('address', response.data?.logradouro);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onPressSave = async (data: FormData) => {
    try {
      const allTeams = await AsyncStorage.getItem('teams');

      if (allTeams !== null) {
        const parsedArrayOfItems: {
          name: string;
          id: string;
          phone: string;
          email: string;
          cep: string;
          city: string;
          address: string;
        }[] = JSON.parse(allTeams);
        if (id) {
          const modifiedArray = parsedArrayOfItems.map((team) => {
            if (team.id === id) {
              return data;
            }
            return team;
          });

          await AsyncStorage.setItem('teams', JSON.stringify(modifiedArray));
        } else {
          const nextId = `${parsedArrayOfItems.length + 1}`;
          data.id = nextId;
          await AsyncStorage.setItem(
            'teams',
            JSON.stringify([...parsedArrayOfItems, data])
          );
        }
      } else {
        data.id = '1';
        await AsyncStorage.setItem('teams', JSON.stringify([data]));
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{ padding: 10, display: 'flex', gap: 8, alignItems: 'center' }}
      >
        <InputController
          name='name'
          placeholder='Digite o nome do time'
          control={control}
        />
        {errors.name?.message && (
          <Text style={{ color: 'red' }}>{errors.name?.message}</Text>
        )}

        <InputController
          name='phone'
          placeholder='Digite o seu telefone'
          control={control}
        />
        {errors.phone?.message && (
          <Text style={{ color: 'red' }}>
            {errors.phone?.message.includes('NaN')
              ? 'Deve conter apenas números'
              : errors.phone?.message}
          </Text>
        )}

        <InputController
          name='email'
          placeholder='Digite seu email'
          control={control}
        />
        {errors.email?.message && (
          <Text style={{ color: 'red' }}> {errors.email?.message}</Text>
        )}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 4,
            justifyContent: 'center',
            height: 50,
            alignItems: 'center',
          }}
        >
          <InputController
            name='cep'
            placeholder='Digite seu CEP'
            control={control}
            styles={{ width: '90%' }}
          />

          <Icons
            onPress={searchCep}
            name='search-outline'
            size={32}
          />
        </View>
        {errors.cep?.message && (
          <Text style={{ color: 'red' }}>
            {' '}
            {errors.cep?.message.includes('NaN')
              ? 'Deve conter apenas números'
              : errors.cep?.message}
          </Text>
        )}

        <InputController
          name='city'
          placeholder='Cidade'
          control={control}
        />

        {errors.city?.message && (
          <Text style={{ color: 'red' }}> {errors.city?.message}</Text>
        )}

        <InputController
          name='address'
          placeholder='Endereço'
          control={control}
        />

        {errors.address?.message && (
          <Text style={{ color: 'red' }}> {errors.address?.message}</Text>
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Pressable
            style={RegisterStyles.buttonCancel}
            onPress={() => reset()}
          >
            <Text style={RegisterStyles.text}>Limpar</Text>
          </Pressable>
          <Pressable
            style={RegisterStyles.button}
            onPress={handleSubmit(onPressSave)}
          >
            <Text style={RegisterStyles.text}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default register;
