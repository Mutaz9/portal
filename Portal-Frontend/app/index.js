import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { login } from "../functions/user";
import Splash from "../components/splashscreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const goToLoginPage = () => {
    router.push("/login");
  };

  const goToRegisterPage = () => {
    router.replace("/register");
  };

  const { authUser, setAuthUser } = useContext(AuthContext);
  useEffect(() => {
    // this prevents user initialization
    if (authUser) {
      router.replace("/home");
    }
  });

  const goToProfilePicture = () => {
    router.replace("/register/categories");
  };

  const developerQuickLogin = () => {
    login("evanwashington2020@gmail.com", "e")
      .then((res) => {
        // console.log(res.data);
        setAuthUser(res);
        router.replace("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="white">
      <Stack.Screen
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
      <Splash />
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: 75 }}>P O R T A L</Text>
        <Text style={{ fontSize: 20, color: "grey" }}>
          Discover your future career
        </Text>
      </View>
      {/* login and register */}
      <TouchableOpacity
        style={{
          backgroundColor: "lightgrey",
          marginBottom: 10,
          marginRight: 6,
          alignSelf: "flex-end",
          alignItems: "center",
          padding: 10,
          borderRadius: 5,
          rowGap: 5,
        }}
        onPress={developerQuickLogin}
      >
        <Text>Quick Login</Text>
        <FontAwesomeIcon icon={faArrowRight} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {/* Replace with Pressable */}
        <TouchableOpacity
          onPress={goToLoginPage}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: 50,
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
            marginLeft: 6,
          }}
        >
          <Text style={{}}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToRegisterPage}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: 50,
            backgroundColor: "black",
            marginRight: 6,
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
