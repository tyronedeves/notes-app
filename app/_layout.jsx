import { Stack } from "expo-router";
import {AuthProvider, useAuth} from '@/contexts/authContext'
import { TouchableOpacity, Text, StyleSheet } from "react-native";



const HeaderLogOut = () => {
  const {user, logOut} = useAuth()

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null
}
export default function RootLayout() {
  return(
  <AuthProvider>
   <Stack
  screenOptions={{
    headerStyle: {
      backgroundColor: '#ff8c00'
    },
    headerTintColor: "#ffff",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    headerRight: () => <HeaderLogOut/>,
    contentStyle: {
      paddingHorizontal: 10,
      paddingTop: 10,
    }
  }}
  >
    <Stack.Screen name="index" options={{title: 'Home'}}/>
    <Stack.Screen name="notes" options={{headerTitle: 'Note'}}/>
    <Stack.Screen name="auth" options={{headerTitle: 'Login'}}/>
  </Stack>
  </AuthProvider> )
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#42a4f5',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})