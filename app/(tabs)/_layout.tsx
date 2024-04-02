import React from 'react';
import { Tabs } from 'expo-router';
import Icons from '@expo/vector-icons/Ionicons';

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icons
              size={28}
              name='home'
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='register'
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color }) => (
            <Icons
              size={28}
              name='add-outline'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
