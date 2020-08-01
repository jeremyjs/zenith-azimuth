import 'react-native-gesture-handler';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { AppNavigator } from './src/AppNavigator';

export default function App () {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
}
