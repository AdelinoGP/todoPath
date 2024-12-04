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
    description: string,
    is_completed: boolean
  ) => {
    try {
      const updatedTodo = await updateTodo(id, {
        title,
        description,
        is_completed,
      });
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
    <View>
      <View style={tw`p-2`}>
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
          <View
            style={[
              tw`mb-4 p-4 border rounded`,
              item.is_completed && tw`bg-green-200`,
            ]}
          >
            <TextInput
              style={tw`border p-2 mb-2`}
              defaultValue={item.title}
              editable={true}
              onBlur={(e) =>
                handleUpdate(
                  item.id,
                  e.nativeEvent.text,
                  item.description ?? "",
                  item.is_completed
                )
              }
            />
            <TextInput
              style={tw`border p-2 mb-2`}
              defaultValue={item.description}
              onBlur={(e) =>
                handleUpdate(
                  item.id,
                  item.title,
                  e.nativeEvent.text,
                  item.is_completed
                )
              }
            />
            <View style={tw`flex-row justify-between`}>
              {item.is_completed ? (
                <Button
                  title="Uncomplete"
                  onPress={() => handleComplete(item.id)}
                />
              ) : (
                <Button
                  title="Complete"
                  onPress={() =>
                    handleUpdate(
                      item.id,
                      item.title,
                      item.description ?? "",
                      false
                    )
                  }
                />
              )}
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
