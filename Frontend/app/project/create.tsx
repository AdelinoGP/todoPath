import { createProject } from "@/api/project/projectApi";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { router } from "expo-router";

const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject(title);
      setError("");
      router.navigate("/userHome"); // Assuming you have a ProjectList screen
    } catch (error) {
      setError("Failed to create project");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter project title"
      />
      <Button title="Create Project" onPress={handleCreateProject} />
      <ErrorMessage message={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#f8d7da",
    borderRadius: 4,
  },
  errorText: {
    color: "#721c24",
    fontSize: 16,
  },
});

export default CreateProject;
