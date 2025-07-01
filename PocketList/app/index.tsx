import { useColorScheme } from "react-native";

// Styles
import { Colors } from "@/constants/Colors";

// Hooks
import { useInitialRedirect } from "@/hooks/useInitialRedirect";

// Components
import Loading from "@/components/loading/loading";

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

  const { loading } = useInitialRedirect();

  if (loading) {
    return <Loading colors={colors} phrases={phrases} />;
  }

  return null;
}
