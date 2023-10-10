import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";

const Home = () => {
  const goToLoginPage = () => {
    router.push("/login");
  };

  const goToRegisterPage = () => {
    router.push("/register");
  };

  const goToInterestsPage = () => {
    router.push("/register/interests");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="white">
      <Stack.Screen
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: 75 }}>P O R T A L</Text>
        <Text style={{ fontSize: 20, color: "grey" }}>
          Discover your future career
        </Text>
      </View>
      {/* login and register */}
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
            width: 180,
            height: 50,
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        >
          <Text style={{}}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToRegisterPage}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 180,
            height: 50,
            backgroundColor: "black",
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
        <TouchableOpacity
          onPress={goToInterestsPage}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 180,
            height: 50,
            backgroundColor: "black",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Interests Page
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
