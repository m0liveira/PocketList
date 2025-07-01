import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles
import { Colors } from "@/constants/Colors";

// Hooks
import { useInitialRedirect } from "@/hooks/useInitialRedirect";

// Components
import Loading from "@/components/loading/loading";
import { useEffect } from "react";
import { firebaseAuth } from "@/src/firebaseConfig";
import { signOut } from "firebase/auth";

const phrases = [
  "A abrir as portas do PocketList...",
  "A conectar-te ao mundo mágico das listas...",
  "A guardar os teus segredos digitais...",
  "A preparar o teu espaço pessoal...",
  "A alinhar as estrelas do PocketList...",
  "A dar vida às tuas ideias...",
  "A organizar o teu universo digital...",
  "A desbloquear o teu cantinho especial...",
  "A preparar as surpresas do PocketList...",
  "A criar ligações mágicas...",
];

export default function Index() {
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];

//   useEffect(() => {
//     const resetAppState = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log("✅ AsyncStorage cleared");

//     await signOut(firebaseAuth);
//     console.log("✅ Signed out from Firebase");

//     console.log("🎉 App state has been fully reset");
//   } catch (e) {
//     console.error("❌ Failed to reset app state", e);
//   }
// };

//     resetAppState();
//   }, []);

  const { loading } = useInitialRedirect();

  if (loading) {
    return <Loading colors={colors} phrases={phrases} />;
  }

  return null;
}
