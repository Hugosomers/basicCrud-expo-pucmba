import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleProp, TextInput, TextStyle, View } from 'react-native';
import { RegisterStyles } from '../../styles/register';

interface InputControllerProps {
  control: Control<
    {
      name: string;
      phone: string;
      email: string;
      cep: string;
      city: string;
      address: string;
    },
    any
  >;
  name: 'name' | 'phone' | 'email' | 'cep' | 'city' | 'address';
  placeholder: string;
  styles?: TextStyle;
  inputValue?: string;
  error?: string;
}

const InputController = ({
  control,
  name,
  placeholder,
  styles,
  inputValue,
  error,
}: InputControllerProps) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          style={{ ...RegisterStyles.inputs, ...styles }}
          onBlur={onBlur}
          onChangeText={onChange}
          value={inputValue || value}
        />
      )}
      name={name}
    />
  );
};

export default InputController;
