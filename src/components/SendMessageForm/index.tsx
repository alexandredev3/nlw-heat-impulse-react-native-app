import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';

import { api } from '../../services/api';

import { Button } from '../Button';

import { styles } from './styles';
import { COLORS } from '../../styles/theme';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessaga] = useState(false);

  async function handleSendMessage() {
    try {
      if (!message.trim()) {
        return;
      }

      setSendingMessaga(true);
  
      await api.post('/messages', {
        message,
      });

      setMessage('');
      Keyboard.dismiss();
    } catch(err) {
      console.error(err);
      Alert.alert("Something went wrong :(");
    } finally {
      setSendingMessaga(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        multiline
        maxLength={140}
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button 
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        disabled={!message}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  );
}