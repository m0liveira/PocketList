import { Tabs } from "expo-router";
import React from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

// Styles
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/GlobalStyles";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

// Components
import * as SVGS from "@/components/svgs/Svgs";
import { HapticTab } from "@/components/HapticTab";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];

  const [loaded] = useFonts({
    AdlamDisplay: require("../../assets/fonts/ADLaMDisplay-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: colors.n400,
          tabBarActiveTintColor: colors.p400,
          headerShown: false,
          animation: "fade",
          tabBarButton: HapticTab,
          tabBarStyle: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.bg400,
            borderTopWidth: 0,
            borderColor: "none",
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
            boxShadow: colors.navShadow,
            height: 85,
            paddingBottom: 16,
            paddingTop: 8,
            paddingHorizontal: 12,
          },
          tabBarLabelStyle: {
            fontFamily: "AdlamDisplay",
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
          },
          tabBarIconStyle: {
            marginBottom: 3,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Listas",
            tabBarIcon: ({ color }) => <SVGS.Home color={color} />,
          }}
        />

        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Desejos",
            tabBarIcon: ({ color }) => <SVGS.Wishlist color={color} />,
          }}
        />

        <Tabs.Screen
          name="recipes"
          options={{
            title: "Receitas",
            tabBarIcon: ({ color }) => <SVGS.Recipes color={color} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => <SVGS.Profile color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
