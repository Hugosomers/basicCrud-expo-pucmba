import React from 'react';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';

import { HomeStyles } from '../../styles/home';

interface ItemProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
}

const Item = ({ id, name, address, phone, city }: ItemProps) => {
  console.log(id);
  return (
    <View style={HomeStyles.bodyItemCard}>
      <View>
        <Text>Nome: {name}</Text>
        <Text>Endereço: {address}</Text>
      </View>
      <View>
        <Text>Telefone: {phone}</Text>
        <Text>Cidade: {city}</Text>
      </View>
      <Link
        href={{
          pathname: '/register',
          params: { id },
        }}
      >
        <Icons
          name='settings-outline'
          size={24}
        />
      </Link>
    </View>
  );
};

export default Item;
