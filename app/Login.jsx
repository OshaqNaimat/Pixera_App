import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const LoginScreen = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        router.replace("/Profile"); // Navigate to profile if logged in
      }
    };
    checkUser();
  }, []);

  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert("Error", "Please enter mobile and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.18.82:5000/api/users/login",
        {
          mobile,
          password,
        },
      );

      // Save user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(response.data));

      // Navigate to profile
      router.replace("/Profile");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>𝓟𝓲𝔁𝓮𝓵𝓪</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          placeholderTextColor="#999"
          value={mobile}
          onChangeText={setMobile}
          keyboardType=""
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? "Logging in..." : "Log in"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("./Signup")}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 45,
  },
  loginButton: {
    backgroundColor: "#4164f1",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#999",
  },
  facebookText: {
    color: "#385185",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  forgotText: {
    textAlign: "center",
    color: "#385185",
    fontSize: 12,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "#0095f6",
    fontWeight: "bold",
  },
});
