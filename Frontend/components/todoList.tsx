import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import {
  getProjectTodos,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "@/api/todo/todoApi";
import { router } from "expo-router";
import tw from "twrnc";

interface TodoListProps {
  projectId: number;
}

const TodoList: React.FC<TodoListProps> = ({ projectId }) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getProjectTodos(projectId);
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [projectId]);

  const handleUpdate = async (
    id: number,
    title: string,
    description: string
  ) => {
    try {
      const updatedTodo = await updateTodo(id, { title, description });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const completedTodo = await completeTodo(id);
      setTodos(todos.map((todo) => (todo.id === id ? completedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View >
      <View style={tw`p-4`}>
        <Button
          title="Add Todo"
          onPress={() =>
            router.push({ pathname: "/todo/create", params: { projectId } })
          }
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`mb-4 p-4 border rounded`}>
            <TextInput
              style={tw`border p-2 mb-2`}
              value={item.title}
              onChangeText={(text) =>
                handleUpdate(item.id, text, item.description ?? "")
              }
            />
            <TextInput
              style={tw`border p-2 mb-2`}
              value={item.description}
              onChangeText={(text) => handleUpdate(item.id, item.title, text)}
            />
            <View style={tw`flex-row justify-between`}>
              <Button
                title="Complete"
                onPress={() => handleComplete(item.id)}
              />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
