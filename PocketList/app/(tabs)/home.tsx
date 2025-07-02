import { useState } from "react";
import {
  useColorScheme,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import { Portal } from "react-native-paper";

// Styles
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/GlobalStyles";
import { homeStyles } from "@/src/styles/home/styles";

// Hooks
import { useInitialRedirect } from "@/hooks/useInitialRedirect";

// Services
import {
  getUserData,
  isUserLoggedIn,
  getUserNotifications,
} from "@/services/userService";

// Components
import * as Svgs from "@/components/svgs/Svgs";
import Loading from "@/components/loading/loading";
import ListCard from "@/components/listCard/listCard";
import NewList from "@/components/newList/newList";

const imageList = [
  require("@/assets/images/chicken.png"),
  require("@/assets/images/pizza.png"),
  require("@/assets/images/drink.png"),
  require("@/assets/images/avocado.png"),
  require("@/assets/images/sushi.png"),
  require("@/assets/images/burrito.png"),
];

const colorList = [
  "hsl(25, 100%, 93%)",
  "hsl(43, 100%, 93%)",
  "hsl(0, 100%, 93%)",
  "hsl(83, 100%, 93%)",
  "hsl(35, 100%, 93%)",
  "hsl(51, 100%, 93%)",
];

const chipsData = [
  [
    "Compras do Mês",
    "Lista da Semana",
    new Date().toLocaleDateString("pt-PT"),
    "Despensa Completa",
    "Compras Rápidas",
    "Essenciais",
    "Compras de Emergência",
  ],
  [
    "Continente",
    "Pingo Doce",
    "Lidl",
    "Mercadona",
    "Caça às Promoções",
    "Carrinho Cheio",
    "Reabastecimento",
  ],
];

export default function Home() {
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = homeStyles(colors);

  // function RedirectLoading() {
  //   const { loading } = useInitialRedirect();
  //   const phrases = [
  //     "A abrir as portas do PocketList...",
  //     "A conectar-te ao mundo mágico das listas...",
  //     "A guardar os teus segredos digitais...",
  //     "A preparar o teu espaço pessoal...",
  //     "A alinhar as estrelas do PocketList...",
  //     "A dar vida às tuas ideias...",
  //     "A organizar o teu universo digital...",
  //     "A desbloquear o teu cantinho especial...",
  //     "A preparar as surpresas do PocketList...",
  //     "A criar ligações mágicas...",
  //   ];

  //   if (loading) {
  //     return <Loading colors={colors} phrases={phrases} />;
  //   }
  //   return null;
  // }

  const [userData, setUserData] = useState(getUserData());
  const [isNewList, setIsNewList] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const handleOnSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      {/* {isUserLoggedIn() ? ( */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Text style={[globalStyles.text, styles.pageTitle]}>
            Listas de compras
          </Text>
          <Svgs.Bell color={colors.text} classname={styles.svg} />

          {getUserNotifications().unread.length > 0 ? (
            <View style={styles.hasNotification} />
          ) : null}
        </View>

        <ListCard />

        <Pressable style={styles.button} onPress={() => setIsNewList(true)}>
          <Svgs.Plus color="hsl(0, 0%, 96%)" classname={styles.svg} />
          <Text style={[globalStyles.text, styles.btnText]}>Nova lista</Text>
        </Pressable>
      </ScrollView>

      {isNewList ? (
        <Portal>
          <NewList
            colors={colors}
            imageList={imageList}
            colorList={colorList}
            chipsData={chipsData}
            isNewList={setIsNewList}
            control={control}
            setValue={setValue}
            errors={errors}
            handleSubmit={handleSubmit(handleOnSubmit)}
          />
        </Portal>
      ) : null}
      {/* ) : (
        RedirectLoading()
      )} */}
    </>
  );
}
