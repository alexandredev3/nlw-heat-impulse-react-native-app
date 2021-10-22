import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { styles } from './styles';

import { useAuth } from '../../contexts/auth';

import LogoSvg from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto';

export function Header(){
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {user && (
          <TouchableOpacity
            onPress={signOut}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>
              Sair
            </Text>
          </TouchableOpacity>
        )}

        <UserPhoto imageURI={user?.avatar_url} />
      </View>
    </View>
  );
}