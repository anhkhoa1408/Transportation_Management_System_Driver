import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../../styles";
import TextField from "../../components/TextField";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <SafeAreaView style={styles.screen}>
      <TextField
        title="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextField
        title="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.forgot}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (email == "Admin" && password == "1")
              navigation.navigate("Account");
            else
              Alert.alert(
                "Error",
                "The user name/e-mail/password provided is incorrect!",
                [{ text: "Again" }]
              );
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    padding: 30,
    alignItems: "stretch",
    backgroundColor: COLORS.background1,
  },
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    marginTop: 30,
  },
  loginBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#3B3DBF",
    borderRadius: 15,
    height: 50,
  },
  forgot: {
    color: "#3B3DBF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
