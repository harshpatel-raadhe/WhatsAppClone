import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  main: {flex: 1},
  nameText: {
    padding: 16,
    fontSize: 20,
    backgroundColor: colors.Green,
    color: colors.white,
    fontWeight: '600',
  },
  userWrapper: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  image: {height: 50, width: 50, borderRadius: 25},
  nameWrapper: {marginLeft: 16},
  name2: {fontSize: 18, color: colors.black},
  line: {height: 1, backgroundColor: colors.grey},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Green,
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
  logout: {color: colors.white, fontSize: 20},
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Green,
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
});
