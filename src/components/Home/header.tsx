import React from 'react';
import { ImageBackground, TextInput, View } from 'react-native';
import { HomeStyles } from '../../styles/home';

const Header = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View style={HomeStyles.header}>
      <ImageBackground
        style={HomeStyles.imgBackground}
        source={require('../../../assets/header-banner.jpg')}
      >
        <View style={HomeStyles.inputWrapper}>
          <TextInput
            placeholder='Pesquise um time cadastrado'
            style={HomeStyles.input}
            value={value}
            onChangeText={setValue}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;
