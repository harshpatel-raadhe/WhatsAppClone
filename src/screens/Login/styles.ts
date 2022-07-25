import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  imageWrapper: {alignItems: 'center', marginTop: 50},
  image: {height: 100, width: 100},
  welcome: {fontSize: 22, color: colors.Green, marginTop: 20},
  inputWrapper: {marginTop: 50},
  input: {
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 16,
    paddingLeft: 16,
    marginTop: 20,
  },
  signup: {fontSize: 16, color: colors.Green},
  buttton: {
    height: 50,
    backgroundColor: colors.Green,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 2,
  },
  login: {fontSize: 20, color: colors.white},
  text2: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
});
