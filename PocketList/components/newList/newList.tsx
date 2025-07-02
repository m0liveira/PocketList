import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller } from "react-hook-form";

// Styles
import { newListStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";

// Components
import * as Svgs from "@/components/svgs/Svgs";

const nameRegex = /^(?!.*\s{2,})([^\s]+(?:\s[^\s]+)*){1,24}$/;
const rndIndex = (list: any) => {
  return Math.floor(Math.random() * list.length);
};

export default function NewList(props: any) {
  const styles = newListStyles(props.colors);
  const [index, setIndex] = useState(rndIndex(props.imageList));

  useEffect(() => {
    props.setValue("name", "");
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

      <Pressable
        onPress={props.handleSubmit}
        style={styles.button}
        // disabled={props.isLoading}
      >
        <Text style={[globalStyles.text, styles.btnText]}>Criar lista</Text>
      </Pressable>
    </View>
  );
}
