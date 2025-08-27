import { useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
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

// Styles
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/GlobalStyles";
import { listStyles } from "@/src/styles/list/styles";

// Hooks
import { useInitialRedirect } from "@/hooks/useInitialRedirect";

// Services
import { getUserData, isUserLoggedIn } from "@/services/userService";
import { getListById, updateListById } from "@/services/firebaseService";

// Components
import * as Svgs from "@/components/svgs/Svgs";
import Loading from "@/components/loading/loading";
import ListHeader from "@/components/listHeader/listHeader";
import ListItem from "@/components/listItem/listItem";
import ListForm from "@/components/listForm/listForm";

export default function Home() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = listStyles(colors);

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

  const [userData, setUserData] = useState(getUserData());
  const [list, setList] = useState<any>({});
  const [unMarked, setUnMarked] = useState<number>(0);
  const [marked, setMarked] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openedItem, setOpenedItem] = useState({} as any);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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

  async function fetchList() {
    if (userData) {
      const result = await getListById(id as string);

      setList(result);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [])
  );

  const calculateValues = (items: any[]) => {
    let marked = 0;
    let unMarked = 0;
    let total = 0;

    items.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;

      if (item.acquired) {
        marked += price * quantity;
      } else {
        unMarked += price * quantity;
      }

      total += price * quantity;
    });

    setMarked(parseFloat(marked.toFixed(2)));
    setUnMarked(parseFloat(unMarked.toFixed(2)));
    setTotal(parseFloat(total.toFixed(2)));
  };

  useEffect(() => {
    setUnMarked(0);
    setMarked(0);
    setTotal(0);

    if (list.items) {
      calculateValues(list.items);
    }
  }, [list.items, list.items?.length, list.items?.acquired]);

  const handleProduct = async (data: any) => {
    if (openedItem) {
      data = { ...openedItem, ...data };
    }

    if (data.id) {
      const updatedItems = list.items.map((item: any) =>
        item.id === data.id ? { ...item, ...data } : item
      );

      const updatedList = { ...list, items: updatedItems };
      setList(updatedList);

      try {
        await updateListById(list.id, { items: updatedItems });
        setIsFormVisible(false);
      } catch (error: any) {
        Alert.alert(
          "Erro a editar produto",
          error.message || "Erro desconhecido"
        );
      }
      return;
    }

    data.addedBy = userData?.uid;
    data.acquired = false;

    if (list.items.length === 0) {
      data.id = 1;
    } else {
      data.id = list.items[list.items.length - 1].id + 1;
    }

    list.items.push(data);

    // setIsLoading(true);

    try {
      await updateListById(list.id, { items: list.items });

      setIsFormVisible(false);
      // setIsLoading(false);
    } catch (error: any) {
      Alert.alert(
        "Erro a adicionar produto",
        error.message || "Erro desconhecido"
      );
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      "Confirmação",
      `Vai apagar o item ${item.product} - ${item.id}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            const updatedItems = list.items.filter(
              (i: any) => i.id !== item.id
            );

            const updatedList = { ...list, items: updatedItems };

            setList(updatedList);

            try {
              await updateListById(list.id, { items: updatedList.items });
              setIsFormVisible(false);
            } catch (error: any) {
              Alert.alert(
                "Erro a editar produto",
                error.message || "Erro desconhecido"
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {isUserLoggedIn() ? (
        list.id ? (
          <View style={styles.page}>
            <ListHeader colors={colors} list={list}></ListHeader>

            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.scrollContainer}
            >
              {list.items &&
                list.items
                  .filter((item: any) => !item.acquired)
                  .map((item: any, idx: number) => (
                    <ListItem
                      key={item.id ?? idx}
                      colors={colors}
                      item={item}
                      handleProduct={handleProduct}
                      openForm={() => {
                        setOpenedItem(item);
                        setIsFormVisible(true);
                      }}
                    />
                  ))}

              <View style={styles.divider}>
                <View style={styles.line}>
                  <Text style={[globalStyles.text, styles.title]}>
                    Não marcados
                  </Text>
                  <Text style={[globalStyles.text, styles.subtitle]}>
                    {unMarked}€
                  </Text>
                </View>
                <View style={styles.line}>
                  <Text style={[globalStyles.text, styles.title]}>
                    Marcados
                  </Text>
                  <Text style={[globalStyles.text, styles.subtitle]}>
                    {marked}€
                  </Text>
                </View>
                <View style={styles.line}>
                  <Text style={[globalStyles.text, styles.title]}>Total</Text>
                  <Text style={[globalStyles.text, styles.subtitle]}>
                    {total}€
                  </Text>
                </View>
              </View>

              {list.items &&
                list.items
                  .filter((item: any) => item.acquired)
                  .map((item: any, idx: number) => (
                    <ListItem
                      key={item.id ?? idx}
                      colors={colors}
                      item={item}
                      handleProduct={handleProduct}
                      openForm={() => {
                        setOpenedItem(item);
                        setIsFormVisible(true);
                      }}
                    />
                  ))}
            </ScrollView>

            <Pressable
              style={styles.button}
              onPress={() => {
                setOpenedItem(null);
                setIsFormVisible(true);
              }}
            >
              <Svgs.Plus color="hsl(0, 0%, 96%)" classname={styles.svg} />

              <Text style={[globalStyles.text, styles.btnText]}>Adicionar</Text>
            </Pressable>

            {isFormVisible ? (
              <Portal>
                <ListForm
                  colors={colors}
                  visible={isFormVisible}
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  onClose={() => {
                    setIsFormVisible(false);
                  }}
                  item={openedItem}
                  handleSubmit={handleSubmit(handleProduct)}
                  handleDelete={handleDelete}
                  inputOptions={[
                    {
                      label: "Nome do produto",
                      type: "text",
                      name: "product",
                      placeholder: "Ex. Pizza",
                      size: "full",
                    },
                    {
                      label: "Quantidade",
                      type: "number",
                      name: "quantity",
                      placeholder: "Ex. 1",
                      size: "small",
                    },
                    {
                      label: "Unidade",
                      type: "select",
                      name: "unit",
                      placeholder: "Selecionar",
                      options: [
                        "Kilogramas",
                        "Gramas",
                        "Litros",
                        "Embalagem",
                        "Pacote",
                        "Unidade",
                        "Sem unidade",
                      ],
                      size: "medium",
                    },
                    {
                      label: "Preço uni.",
                      type: "currency",
                      name: "price",
                      placeholder: "Ex. 1,00€",
                      size: "small",
                    },
                  ].filter(Boolean)}
                />
              </Portal>
            ) : null}
          </View>
        ) : null
      ) : (
        <>{RedirectLoading()}</>
      )}

      {isLoading ? (
        <Portal>
          <Loading colors={colors} phrases={phrases} />
        </Portal>
      ) : null}
    </>
  );
}
