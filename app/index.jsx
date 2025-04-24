import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Only redirect if we have a user and aren't already in the process of redirecting
    if (!loading && user && !isRedirecting) {
      setIsRedirecting(true);
      router.replace('/notes');
    }
  }, [user, loading, router, isRedirecting]);

  // Show loading indicator while either the auth is loading or we're in the process of redirecting
  if (loading || isRedirecting) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const handleGetStarted = () => {
    // If user is logged in, go to notes
    // If not, go to auth screen
    if (user) {
      router.push('/notes');
    } else {
      router.push('/auth');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Capture your thoughts anytime, anywhere</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  }
});