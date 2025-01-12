import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, TextInput, Button, Paragraph } from 'react-native-paper';

export default function AIChatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Here you would typically send the input to your AI service and get a response
      // For now, we'll just mock a response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm sorry, I'm just a mock AI assistant. In a real app, I would provide helpful information about procurement!", isUser: false }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>AI Assistant</Title>
        <View style={styles.chatContainer}>
          {messages.map((message, index) => (
            <Paragraph key={index} style={message.isUser ? styles.userMessage : styles.aiMessage}>
              {message.text}
            </Paragraph>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything..."
            style={styles.input}
          />
          <Button mode="contained" onPress={handleSend}>Send</Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  chatContainer: {
    height: 200,
    marginBottom: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e6e6e6',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});

