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
} from "@chakra-ui/react";
import React from "react";

type QuestionDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

// const handleSubmit = () => {
//   setIsLoading(true);
//   // ここに送信処理を実装
//   setTimeout(() => {
//     setIsLoading(false);
//     toast({
//       title: "Your question has been posted",
//       status: "success",
//       duration: 2000,
//       isClosable: true,
//     });
//     onClose(); // モーダル閉じる
//   }, 1000);
// };

const QuestionDeleteModal: React.FC<QuestionDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
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
          <Button colorScheme="red" onClick={onConfirm}>
            DELETE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionDeleteModal;
