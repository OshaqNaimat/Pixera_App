import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const SignupScreen = () => {
  // Form state
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!mobile || !password || !fullName || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.100.127:5000/api/users/register",
        {
          mobile,
          password,
          fullName,
          username,
        },
      );

      // Save user locally for persistence
      // await AsyncStorage.setItem("user", JSON.stringify(response.data));

      Alert.alert("Success", "Account created successfully!");

      // Navigate to Profile page
      router.replace("/Login");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>𝓟𝓲𝔁𝓮𝓵𝓪</Text>
          <Text style={styles.subtitle}>
            Sign up to see photos and videos from your friends.
          </Text>

          {/* Mobile */}
          <TextInput
            style={styles.input}
            placeholder="Mobile Number or Email"
            placeholderTextColor="#999"
            value={mobile}
            onChangeText={setMobile}
            // keyboardType="phone-pad"
          />

          {/* Password */}
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

          {/* Full Name */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.infoText}>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <Text style={styles.link}>Learn More</Text>
          </Text>

          <Text style={styles.infoText}>
            By signing up, you agree to our{" "}
            <Text style={styles.link}>Terms</Text>,{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerText}>
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login redirect */}
        <View style={styles.loginBox}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/Login")}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 11,
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
    fontSize: 14,
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
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    height: 45,
  },
  infoText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginVertical: 6,
  },
  link: {
    color: "#0095f6",
    fontWeight: "500",
  },
  registerButton: {
    backgroundColor: "#2e7df6",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#0095f6",
    fontWeight: "bold",
  },
});
