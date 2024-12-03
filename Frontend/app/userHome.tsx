import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import ProjectList from "@/components/projectList";
import TodoList from "@/components/todoList";

export default function UserHome() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  return (
    <View style={styles.container}>
      <ProjectList onSelect={setSelectedProjectId} />
      {selectedProjectId && <TodoList projectId={selectedProjectId} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
