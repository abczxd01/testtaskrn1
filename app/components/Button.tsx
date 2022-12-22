import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Button = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{'Try again'}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.7)',
    width: '35%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.7)',
  },
});
