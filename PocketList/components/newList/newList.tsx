import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller } from "react-hook-form";

// Styles
import { newListStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";

// Services
import { getUserData } from "@/services/userService";
import { getUserInfo } from "@/services/firebaseService";

// Components
import * as Svgs from "@/components/svgs/Svgs";

const nameRegex = /^(?!.*\s{2,})([^\s]+(?:\s[^\s]+)*){1,24}$/;
const rndIndex = (list: any) => {
  return Math.floor(Math.random() * list.length);
};

export default function NewList(props: any) {
  const styles = newListStyles(props.colors);
  const [index, setIndex] = useState(rndIndex(props.imageList));
  const [friends, setFriends]: any = useState([]);

  useEffect(() => {
    setFriends([]);
    props.setFriends([]);
    props.setValue("name", "");

    getUserData()?.firestoreData.friends.friends.forEach(
      async (friend: any) => {
        const result = await getUserInfo(friend);

        setFriends((prevFriends: any[]) => [
          ...prevFriends,
          {
            id: result.id,
            username: result.username,
            email: result.email,
          },
        ]);
      }
    );
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.chip}
      onPress={() => {
        props.setValue("name", item);
      }}
    >
      <Text style={[globalStyles.text, styles.chipText]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.arrowContainer}
        onPress={() => props.isNewList(false)}
      >
        <Svgs.BackArrow classname={styles.arrow} color={props.colors.text} />
      </Pressable>

      <View style={styles.imageContainer}>
        <Svgs.Blob color={props.colorList[index]} classname={styles.blob} />

        <Image
          source={props.imageList[index]}
          resizeMode="contain"
          accessibilityLabel={"PocketList Mascot"}
          accessibilityHint={"A friendly mascot representing PocketList"}
          accessibilityRole="image"
          style={styles.image}
        />
      </View>

      <View style={styles.inputContainer}>
        <Svgs.UserName classname={styles.svg} color={props.colors.n400} />

        <Controller
          control={props.control}
          name="name"
          rules={{
            required: "O campo é obrigatório",
            pattern: {
              value: nameRegex,
              message:
                "O nome da lista deve ter no máximo 24 caracteres, sem espaços consecutivos",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                globalStyles.text,
                styles.input,
                props.errors["name"] ? styles.inputError : null,
              ]}
              placeholder="Ex. Compras do mês"
              placeholderTextColor={props.colors.n300}
              keyboardType="default"
              autoCapitalize="none"
              textContentType="name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      {props.errors["name"] ? (
        <Text style={[globalStyles.text, styles.error]}>
          {props.errors["name"].message}
        </Text>
      ) : null}

      <Text style={[globalStyles.text, styles.subtitle]}>Sugestões</Text>

      {props.chipsData.map((chipList: any, sliderIndex: any) => (
        <View key={`slider-${sliderIndex}`} style={styles.chipContainer}>
          <LinearGradient
            colors={[props.colors.bg200, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, styles.left]}
            pointerEvents="none"
          />

          <LinearGradient
            colors={["transparent", props.colors.bg200]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, styles.right]}
            pointerEvents="none"
          />

          <FlatList
            data={chipList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ))}

      {friends.length > 0 ? (
        <>
          <Text style={[globalStyles.text, styles.subtitle]}>
            Convidar amigos
          </Text>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
          >
            <LinearGradient
              colors={[props.colors.bg200, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.gradientTop]}
              pointerEvents="none"
            />

            {friends.map((friend: any) => (
              <TouchableOpacity
                key={friend.id}
                style={[
                  styles.friends,
                  props.friends.includes(friend.id) ? styles.selected : null,
                ]}
                onPress={() => {
                  props.setFriends((prevFriends: any) => {
                    if (prevFriends.includes(friend.id)) {
                      return prevFriends.filter(
                        (id: string) => id !== friend.id
                      );
                    } else {
                      return [...prevFriends, friend.id];
                    }
                  });
                }}
              >
                <Text style={[globalStyles.text, styles.username]}>
                  {friend.username}
                </Text>

                <Text style={[globalStyles.text, styles.email]}>
                  {friend.email}
                </Text>
              </TouchableOpacity>
            ))}

            <LinearGradient
              colors={["transparent", props.colors.bg200]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.gradientBottom]}
              pointerEvents="none"
            />
          </ScrollView>
        </>
      ) : null}

      <Pressable onPress={props.handleSubmit} style={styles.button}>
        <Text style={[globalStyles.text, styles.btnText]}>Criar lista</Text>
      </Pressable>
    </View>
  );
}
