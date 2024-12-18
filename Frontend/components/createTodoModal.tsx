import { createTodo } from "@/api/todo/todoApi";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import tw from "twrnc";

interface CreateTodoModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  projectId: number;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({
  projectId,
  modalVisible,
  setModalVisible,
}) => {
  const [title, setTitle] = useState("");
  const [is_completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [titleMissing, setTitleMissing] = useState<boolean>(false);
  const [fullyShown, setFullyShown] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      if (title == "") {
        setError("Title is required");
        setTitleMissing(true);
        return;
      }
      await createTodo({
        title,
        description,
        project_id: Number(projectId),
        is_completed,
      });

      setTitleMissing(false);
      setModalVisible(false);
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      presentationStyle="overFullScreen"
      visible={modalVisible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        setFullyShown(false);
        setModalVisible(!modalVisible);
      }}
      onShow={() => setFullyShown(true)}
    >
      <View
        style={tw`flex-1 justify-center items-center ${
          fullyShown ? "bg-gray-500/60" : ""
        }`}
      >
        <View style={tw`bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold`}>Create Todo</Text>{" "}
            <Pressable
              style={tw`bg-red-500 p-1.5 rounded-lg`}
              onPress={(e) => setModalVisible(!modalVisible)}
            >
              <Text style={tw`text-white text-center`}>X</Text>
            </Pressable>
          </View>

          {error && (
            <Text style={tw`text-red-500 mb-4 text-center`}>{error}</Text>
          )}
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg mb-2`}>Title</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 w-full ${
                titleMissing ? "border-red-500" : ""
              }`}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter todo title"
            />
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg mb-2`}>Description</Text>
            <TextInput
              style={tw`border border-gray-300 rounded p-2 w-full`}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter todo description"
              multiline
            />
          </View>
          <View style={tw`mb-4 flex-row items-center`}>
            <Switch value={is_completed} onValueChange={setCompleted} />
            <Text style={tw`ml-2 text-lg`}>Completed</Text>
          </View>
          <Button title="Create Todo" onPress={handleSubmit} color="#3192ec" />
        </View>
      </View>
    </Modal>
  );
};

export default CreateTodoModal;
