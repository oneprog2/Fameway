import { View, Button, Text } from 'react-native';

export const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to Home page" onPress={() => navigation.navigate('Home')} />
      <Text>Profile Screen</Text>
    </View>
  );
};
