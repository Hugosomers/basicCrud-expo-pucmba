import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../../src/components/Home/item';
import Header from '../../src/components/Home/header';

const Home = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [teams, setTeams] = useState([]);

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
        value && setTeams(JSON.parse(value));
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <View>
      {refreshing ? <ActivityIndicator /> : null}
      <View style={{ height: '15%' }}>
        <Header
          value={search}
          setValue={setSearch}
        />
      </View>
      <View style={{ height: '85%' }}>
        <FlatList
          style={{ marginTop: 10 }}
          data={teams.filter(({ name }: { name: string }) =>
            name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({
            item,
          }: {
            item: {
              id: string;
              name: string;
              address: string;
              phone: string;
              city: string;
            };
          }) => (
            <Item
              key={item.id}
              name={item.name}
              id={item.id}
              address={item.address}
              phone={item.phone}
              city={item.city}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadTeams()}
            />
          }
        />
      </View>
    </View>
  );
};

export default Home;
