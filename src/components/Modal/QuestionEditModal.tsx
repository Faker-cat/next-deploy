import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios"; // axiosのインポート
import { useEffect, useState } from "react";

interface QuestionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: number | null;
  getQuestions: () => void;
}

const QuestionEditModal: React.FC<QuestionEditModalProps> = ({
  isOpen,
  onClose,
  questionId,
  // getQuestions,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const toast = useToast();

  // 質問の詳細を取得
  useEffect(() => {
    if (questionId === null) return;

    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/questions/${questionId}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error("Failed to fetch question details:", error);
        toast({
          title: "Error",
          description: "Failed to load question details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchQuestion();
  }, [questionId, toast]);

  // 編集処理
  // const handleSubmit = async () => {
  //   if (questionId === null) return;

  //   try {
  //     await axios.put(`/api/questions/${questionId}`, { title, content });
  //     toast({
  //       title: "Question updated.",
  //       description: "Your question has been updated successfully.",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     getQuestions(); // 質問を再取得
  //     onClose(); // モーダルを閉じる
  //   } catch (error) {
  //     toast({
  //       title: "Error updating question.",
  //       description: "There was an error updating your question.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            mb={4}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Question content"
            mb={4}
            rows={6}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          {/* <Button colorScheme="teal" onClick={handleSubmit}> */}
          <Button colorScheme="teal">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionEditModal;
