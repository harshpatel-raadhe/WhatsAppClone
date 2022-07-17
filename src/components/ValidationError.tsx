import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../Theme';

interface Iprops {
  errorText: any;
  wrapperStyle?: any;
}

const ValidationError = (props: Iprops) => {
  const {errorText, wrapperStyle} = props;
  return (
    <View style={[{marginLeft: 16}, wrapperStyle]}>
      <Text style={{color: colors.red}}>{errorText}</Text>
    </View>
  );
};

export default ValidationError;

const styles = StyleSheet.create({});
