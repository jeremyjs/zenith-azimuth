import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Inbox } from './src/views';

export default function App () {
  return (
    <View style={styles.container}>
      <Inbox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
