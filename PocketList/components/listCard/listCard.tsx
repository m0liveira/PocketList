import { useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { listCardStyles } from "@/components/listCard/styles";

// Services
import { getUserInfo } from "@/services/firebaseService";
import { getUserData } from "@/services/userService";

// Components
import * as Svgs from "@/components/svgs/Svgs";
import { router } from "expo-router";

export default function ListCard(props: any) {
  const styles = listCardStyles(props.colors);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  const itemsBought = props.list.items.filter(
    (item: any) => item.acquired === true
  );

  const progress = (itemsBought.length / props.list.items.length) * 100;

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
      if (props.list.collaborators.length <= 0) {
        return;
      }

      setCollaborators([
        {
          name: getUserData()?.username.charAt(0).toUpperCase() || "",
          color: getRandomColor(),
        },
      ] as any);

      if (props.list.collaborators.length >= 3) {
        let result = await getUserInfo(
          props.list.collaborators[
            Math.floor(Math.random() * props.list.collaborators.length)
          ]
        );

        let aux = [
          {
            name: result.username.charAt(0).toUpperCase(),
            color: getRandomColor(),
          },
          {
            name: `+${props.list.collaborators.length - 2}`,
            color: props.colors.n100,
          },
        ];

        aux.forEach((item) => {
          setCollaborators((prev: any) => [...prev, item]);
        });

        return;
      }

      props.list.collaborators.forEach(async (collaborator: any) => {
        let result = await getUserInfo(collaborator);

        let aux = {
          name: result.username.charAt(0).toUpperCase(),
          color: getRandomColor(),
        };

        setCollaborators((prev: any) => [...prev, aux]);
      });
    };

    getCollaborators();
  }, []);

  return (
    <Pressable
      style={[styles.container, props.style]}
      onPress={() => router.push(`screens/list/${props.list.id}`)}
    >
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={[globalStyles.text, styles.title]}>
            {props.list.name}
          </Text>

          {props.list.collaborators.length >= 1 ? (
            <View style={styles.userContainer}>
              {collaborators.map((collaborator: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.user,
                    { backgroundColor: collaborator.color },
                    index === 0 ? { left: 0 } : { left: 11 * index },
                  ]}
                >
                  <Text
                    style={[
                      globalStyles.text,
                      styles.name,
                      collaborator.name.startsWith("+")
                        ? { color: props.colors.p300 }
                        : null,
                    ]}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  >
                    {collaborator.name}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <Pressable onPress={props.onOpen}>
          <Svgs.More color={props.colors.n300} classname={styles.svg} />
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.bar}>
          <View
            style={[
              styles.progress,
              { width: `${progress}%` },
              progress === 100
                ? { backgroundColor: props.colors.success }
                : null,
            ]}
          ></View>
        </View>

        <Text style={[globalStyles.text, styles.indicator]}>
          {itemsBought ? itemsBought.length : 0}/{props.list.items.length}
        </Text>
      </View>
    </Pressable>
  );
}
