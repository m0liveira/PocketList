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

// Components
import * as Svgs from "@/components/svgs/Svgs";

export default function ListCard(props: any) {
  const styles = listCardStyles(props.colors);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  const itemsBought = props.list.items.filter(
    (item: any) => item.acquired === true
  );

  const progress = (itemsBought.length / props.list.items.length) * 100;

  function getRandomColor() {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#33FFF5",
      "#F5FF33",
      "#8E44AD",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    setCollaborators([]);

    const getCollaborators = () => {
      if (props.list.collaborators.length <= 1) {
        return;
      }

      if (props.list.collaborators.length > 3) {
        let aux = [
          {
            name: props.list.collaborators[0].charAt(0).toUpperCase(),
            color: getRandomColor(),
          },
          {
            name: props.list.collaborators[1].charAt(0).toUpperCase(),
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
    <View
      style={[
        styles.container,
        props.style,
        progress === 100 ? { opacity: 0.6 } : null,
      ]}
    >
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={[globalStyles.text, styles.title]}>
            {props.list.name}
          </Text>

          {props.list.collaborators.length > 1 ? (
            <View style={styles.userContainer}>
              {collaborators.map((collaborator: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.user,
                    { backgroundColor: collaborator.color },
                    index === 0 ? { left: 0 } : { left: 10 * index },
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

        <Pressable
          onPress={() => {
            console.log(props.list.id);
          }}
        >
          <Svgs.More color={props.colors.n300} classname={styles.svg} />
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.bar}>
          <View style={[styles.progress, { width: `${progress}%` }]}></View>
        </View>

        <Text style={[globalStyles.text, styles.indicator]}>
          {itemsBought ? itemsBought.length : 0}/{props.list.items.length}
        </Text>
      </View>
    </View>
  );
}
