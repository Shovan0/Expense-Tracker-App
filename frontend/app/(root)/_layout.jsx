import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
