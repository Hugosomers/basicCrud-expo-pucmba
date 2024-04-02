import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    height: '40%',
    width: '100%',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bodyItemCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3a0',
    marginVertical: 10,
  },
});
