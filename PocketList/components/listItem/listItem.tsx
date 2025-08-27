import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { listItemStyles } from "@/components/listItem/styles";

// Services
import { getUserInfo } from "@/services/firebaseService";

// Components
import * as Svgs from "@/components/svgs/Svgs";

export default function ListItem(props: any) {
  const styles = listItemStyles(props.colors);

  const [collaborator, setCollaborator] = useState<any>({});

  const getRoundedUnit = (unit: string) => {
    switch (unit) {
      case "Sem unidade":
        return "";
      case "Kilogramas":
        return "Kg";
      case "Gramas":
        return "g";
      case "Litros":
        return "L";
      default:
        return unit.length > 0 ? ` ${unit.slice(0, 3)}.` : "";
    }
  };

  function getRandomColor() {
    const colors = [
      "#FFB3A7",
      "#B5EAD7",
      "#AEC6FF",
      "#FFB3DE",
      "#B3F0FF",
      "#FFF5B3",
      "#D1B3FF",
      "#FFD6A5",
      "#C5E1B3",
      "#A7E0FF",
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    const getCollaborators = async () => {
      setCollaborator({});

      const result = await getUserInfo(props.item.addedBy);

      setCollaborator({
        name: result?.username.charAt(0).toUpperCase() || "?",
        color: getRandomColor(),
      });

      return;
    };

    getCollaborators();
  }, []);

  return (
    <Pressable
      style={[styles.card, props.item.acquired ? styles.checkedCard : null]}
      onPress={props.openForm}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={[
            styles.checkbox,
            props.item.acquired ? styles.checkedCheckbox : null,
          ]}
          onPress={() => {
            props.item.acquired = !props.item.acquired;
            props.handleProduct(props.item);
          }}
        >
          {props.item.acquired ? (
            <Svgs.CheckMark color={props.colors.bg400} />
          ) : null}
        </Pressable>

        <Text
          style={[
            globalStyles.text,
            styles.itemName,
            props.item.acquired ? styles.checkedTextColor : null,
          ]}
        >
          {props.item.product}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={[
            globalStyles.text,
            styles.infoText,
            props.item.acquired ? styles.checkedTextColor : null,
          ]}
        >
          {props.item.quantity}
          {getRoundedUnit(props.item.unit)}
        </Text>

        <Text
          style={[
            globalStyles.text,
            styles.infoText,
            props.item.acquired ? styles.checkedTextColor : null,
          ]}
        >
          {props.item.price.length > 0 ? props.item.price : 0}€
        </Text>

        <Pressable
          style={[
            styles.user,
            { backgroundColor: collaborator.color },
            props.item.acquired ? { filter: "saturate(30%)" } : null,
          ]}
        >
          <Text style={styles.userName}>{collaborator.name}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
