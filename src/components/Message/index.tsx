import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { MotiView } from 'moti';

import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export type MessageValues = {
  id: number;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

type MessageProps = {
  data: MessageValues;
}

export function Message({ data }: MessageProps) {
  return (
    <MotiView 
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.messageText}>
        {data.text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto 
          imageURI={data.user.avatar_url}
          size="SMALL" 
        />

        <Text style={styles.userName}>
          {data.user.name}
        </Text>
      </View>
    </MotiView>
  );
}