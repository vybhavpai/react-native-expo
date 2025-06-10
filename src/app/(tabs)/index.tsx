import { Text, View, StyleSheet} from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login" style={styles.link}>
        Go to Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "white",
    marginTop: 10,
    height: 40,
    width: 100,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
