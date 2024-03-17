import React from 'react';
import {StyleSheet, Text} from 'react-native';

import NotificationCard from './NotificationCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#113',
    borderRadius: 30,
    elevation: 5,
    padding: 20,
    margin: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  body: {
    color: 'white',
    fontSize: 18,
    paddingBottom: 40,
  },
});

type Props = {
  onOut?: () => void;
};

const Card = ({onOut}: Props) => {
  return (
    <NotificationCard style={styles.card} threshold={80} onOut={onOut}>
      <Text style={styles.title}>Notification card</Text>
      <Text style={styles.body}>Drag me 👆 and 👇</Text>
    </NotificationCard>
  );
};

export default Card;
