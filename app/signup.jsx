import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SignupScreen = () => {
  const [secureText, setSecureText] = useState(true);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>Instagram</Text>

        <Text style={styles.subtitle}>
          Sign up to see photos and videos from your friends.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number or Email"
          placeholderTextColor="#999"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={secureText}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />

        <Text style={styles.infoText}>
          People who use our service may have uploaded your contact information
          to Instagram. <Text style={styles.link}>Learn More</Text>
        </Text>

        <Text style={styles.infoText}>
          By signing up, you agree to our <Text style={styles.link}>Terms</Text>
          , <Text style={styles.link}>Privacy Policy</Text>
        </Text>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginBox}>
        <Text>Have an account? </Text>
        <Text style={styles.loginText}>Log in</Text>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
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
