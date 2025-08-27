import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    AdlamDisplay: require("../assets/fonts/ADLaMDisplay-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="screens/intro" />
          <Stack.Screen name="screens/login" />
          <Stack.Screen name="screens/signup" />
          <Stack.Screen name="screens/forgotpassword" />
          <Stack.Screen name="screens/list/[id]" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
