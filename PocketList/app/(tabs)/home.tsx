import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  useColorScheme,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { Portal } from "react-native-paper";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebaseConfig";
import { router } from "expo-router";

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
import {
  setFirestoreData,
  deleteFirestoreData,
  LIST_COLLECTION_REF,
  getUserLists,
} from "@/services/firebaseService";

// Components
import * as Svgs from "@/components/svgs/Svgs";
import Loading from "@/components/loading/loading";
import ListCard from "@/components/listCard/listCard";
import NewList from "@/components/newList/newList";
import ActionSheet from "@/components/actionSheet/actionSheet";

const phrases = [
  "A criar a tua lista perfeita...",
  "A organizar cada detalhe da lista...",
  "A afiar os lápis do PocketList...",
  "A costurar a tua lista personalizada...",
  "A construir o teu espaço de compras...",
  "A polir os detalhes da tua lista...",
  "A dar forma às tuas necessidades...",
  "A ligar cada item com magia...",
  "A criar ligações entre os teus desejos...",
];

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

  function RedirectLoading() {
    const { loading } = useInitialRedirect();
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

    if (loading) {
      return <Loading colors={colors} phrases={phrases} />;
    }
    return null;
  }

  const [userData, setUserData] = useState(getUserData());
  const [unPinnedLists, setUnPinnedLists] = useState<any[]>([]);
  const [pinnedLists, setPinnedLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [isNewList, setIsNewList] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchLists() {
    if (userData) {
      const result = await getUserLists(userData.uid, "shopping");
      setUnPinnedLists(result.lists);
      setPinnedLists(result.pinned);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchLists();
    }, [userData])
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleCreateList = async (data: any) => {
    setIsLoading(true);

    try {
      const listsCollectionRef = collection(db, LIST_COLLECTION_REF);
      const endpoint = doc(listsCollectionRef);

      const list = {
        id: endpoint.id,
        name: data.name,
        type: "shopping",
        items: [],
        collaborators: [userData?.uid],
        isPinned: false,
        createdAt: serverTimestamp(),
      };

      await setFirestoreData(list, endpoint);

      setIsNewList(false);
      setIsLoading(false);
      // router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Erro no login", error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePin = async () => {
    setIsLoading(true);

    try {
      const endpoint = doc(db, LIST_COLLECTION_REF, selectedList.id);

      await setFirestoreData({ isPinned: !selectedList.isPinned }, endpoint);

      await fetchLists();

      setActionVisible(false);
      setSelectedList(null);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      if (selectedList.collaborators.length === 1) {
        await deleteFirestoreData(LIST_COLLECTION_REF, selectedList.id);
      } else {
        const endpoint = doc(db, LIST_COLLECTION_REF, selectedList.id);

        const updatedCollaborators = selectedList.collaborators.filter(
          (user: string) => user !== userData?.uid
        );

        await setFirestoreData(
          { collaborators: updatedCollaborators },
          endpoint
        );
      }

      await fetchLists();
      setActionVisible(false);
      setSelectedList(null);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (data: any) => {
    setIsLoading(true);

    try {
      const endpoint = doc(db, LIST_COLLECTION_REF, selectedList.id);

      await setFirestoreData({ name: data.name }, endpoint);

      await fetchLists();

      setActionVisible(false);
      setSelectedList(null);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isUserLoggedIn() ? (
        <View style={styles.page}>
          <View style={styles.header}>
            <Text style={[globalStyles.text, styles.pageTitle]}>
              Listas de compras
            </Text>

            <Svgs.Bell color={colors.text} classname={styles.svg} />

            {getUserNotifications().unread.length > 0 ? (
              <View style={styles.hasNotification} />
            ) : null}
          </View>

          {unPinnedLists.length > 0 || pinnedLists.length > 0 ? (
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.scrollContainer}
            >
              {pinnedLists.length > 0 ? (
                <Text style={[globalStyles.text, styles.title]}>Afixado</Text>
              ) : null}

              {pinnedLists.map((list: any, index: number) => (
                <ListCard
                  key={list.id}
                  list={list}
                  colors={colors}
                  onOpen={() => {
                    setSelectedList(list);
                    setActionVisible(true);
                  }}
                  style={{
                    marginTop: index === 0 && pinnedLists.length > 0 ? 10 : 20,
                  }}
                />
              ))}

              {unPinnedLists.length > 0 ? (
                <Text style={[globalStyles.text, styles.title]}>Listas</Text>
              ) : null}

              {unPinnedLists.map((list: any, index: number) => (
                <ListCard
                  key={list.id}
                  list={list}
                  colors={colors}
                  onOpen={() => {
                    setSelectedList(list);
                    setActionVisible(true);
                  }}
                  style={{
                    marginTop: index === 0 && pinnedLists.length > 0 ? 10 : 20,
                  }}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.empty}>
                <Svgs.Blob color={colors.blob1} classname={styles.blob} />
                <Image
                  style={styles.image}
                  source={require("@/assets/images/basket.png")}
                  resizeMode="contain"
                  accessibilityLabel={"Basket"}
                  accessibilityHint={"A 3D shopping basket"}
                  accessibilityRole="image"
                />
              </View>

              <Text style={[globalStyles.text, styles.emptyText]}>
                Sem lista, sem compras! 😋
              </Text>

              <Text style={[globalStyles.text, styles.emptySubText]}>
                Bora encher com coisas boas?
                {"\n"}
                Começa uma lista e organiza as tuas compras!
              </Text>
            </View>
          )}

          <Pressable
            style={[
              styles.button,
              unPinnedLists.length > 0 || pinnedLists.length > 0
                ? styles.buttonSmall
                : null,
            ]}
            onPress={() => setIsNewList(true)}
          >
            <Svgs.Plus color="hsl(0, 0%, 96%)" classname={styles.svg} />
            <Text style={[globalStyles.text, styles.btnText]}>Nova lista</Text>
          </Pressable>

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
                handleSubmit={handleSubmit(handleCreateList)}
              />
            </Portal>
          ) : null}

          {isLoading ? (
            <Portal>
              <Loading colors={colors} phrases={phrases} />
            </Portal>
          ) : null}

          {actionVisible ? (
            <Portal>
              <ActionSheet
                colors={colors}
                visible={actionVisible}
                listName={selectedList?.name || "erro"}
                collaborators={selectedList?.collaborators.length || 0}
                onClose={() => setActionVisible(false)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                deleteText={
                  selectedList?.collaborators.length <= 1
                    ? "Tem a certeza que quer eliminar " +
                      selectedList?.name +
                      "?"
                    : "Tem a certeza que quer sair de " +
                      selectedList?.name +
                      "?"
                }
                options={[
                  {
                    label: selectedList?.isPinned
                      ? "Desafixar lista"
                      : "Afixar lista",
                    edit: false,
                    onPress: handlePin,
                  },
                  { label: "Editar lista", edit: true },
                  {
                    label:
                      selectedList?.collaborators.length <= 1
                        ? "Eliminar lista"
                        : "Sair da lista",
                    destructive: true,
                  },
                ]}
                control={control}
                setValue={setValue}
                errors={errors}
                handleSubmit={handleSubmit(handleEdit)}
              />
            </Portal>
          ) : null}
        </View>
      ) : (
        <>{RedirectLoading()}</>
      )}
    </>
  );
}
