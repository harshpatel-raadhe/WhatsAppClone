import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: colors.white},
  flex2: {flex: 1},
  imageWrapper: {alignItems: 'center', marginTop: 20},
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  image2: {
    height: 120,
    width: 120,
  },
  input: {
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 16,
    paddingLeft: 16,
    marginTop: 20,
  },
  selectImage: {
    height: 50,
    backgroundColor: colors.Green,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 2,
  },
  signup: {fontSize: 20, color: colors.white},
  signupButton: {
    height: 50,
    backgroundColor: colors.Green,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 2,
  },
});
