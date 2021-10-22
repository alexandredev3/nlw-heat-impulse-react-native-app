import React from 'react';
import {
  View
} from 'react-native';

import { Button } from '../Button';

import { useAuth } from '../../contexts/auth';

import { COLORS } from '../../styles/theme';
import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSigning } = useAuth();

  return (
    <View style={styles.container}>
      <Button 
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSigning}
      />
    </View>
  );
}