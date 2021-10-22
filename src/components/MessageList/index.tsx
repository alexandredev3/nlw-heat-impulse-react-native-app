import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
} from 'react-native';

import { api } from '../../services/api';
import { socket } from '../../services/socket';

import { Message, MessageValues } from '../Message';

import { styles } from './styles';

export function MessageList() {
  const [messages, setMessages] = useState<MessageValues[]>([]);

  useEffect(() => {
    api.get<MessageValues[]>('/messages').then(response => {
      const { data } = response;
      
      setMessages(data);
    }).catch(err => {
      console.log(err);
      Alert.alert('Failed to load the lastest messages');
    })
  }, []);

  useEffect(() => {
    socket.on('new_messages', newMessage => {
      if (!newMessage) {
        return;
      }

      setMessages(prevState => [
        newMessage,
        prevState[0],
        prevState[1]
      ].filter(Boolean));
    })

    return () => {
      socket.off('new_messages');
    }
  }, [socket]);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map(message => {
        return <Message key={message.id} data={message} />;
      })}
    </ScrollView>
  );
}