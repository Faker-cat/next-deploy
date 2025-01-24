import supabase from "@/libs/supabase";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

type QuestionDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  handleGet: () => void;
  deleteTargetId: number | null;
};

const QuestionDeleteModal: React.FC<QuestionDeleteModalProps> = ({
  isOpen,
  onClose,
  handleGet,
  deleteTargetId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function DeleteQuestion() {
    try {
      const { data } = await supabase.auth.getSession();
      setIsLoading(true);

      const url =
        process.env.NEXT_PUBLIC_API_URL +
        `/questions/${data.session?.user.id}/${deleteTargetId}`;
      await axios.delete(url);
      handleGet();
      toast({
        title: "User deleted !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to delete user",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>削除の確認</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>本当にこの質問を削除しますか？</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="gray" mr={3} onClick={onClose}>
            cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={DeleteQuestion}
            isLoading={isLoading}
          >
            DELETE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionDeleteModal;
