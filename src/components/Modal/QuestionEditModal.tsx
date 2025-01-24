import supabase from "@/libs/supabase";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialAuthor: string;
  initialContent: string;
  questionId: number | null;
  handleGet: () => void;
}

export function QuestionEditModal({
  isOpen,
  onClose,
  initialTitle,
  initialAuthor,
  initialContent,
  questionId,
  handleGet,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [isAnonymous, setIsAnonymous] = useState(initialAuthor === "匿名");
  const [author, setAuthor] = useState(initialAuthor);
  const [content, setContent] = useState(initialContent);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const maxTitleLength = 50;
  const maxContentLength = 500;

  // モーダルが閉じられるたび、または初期値が変わるたびにフォームをリセット
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setIsAnonymous(initialAuthor === "匿名");
      setAuthor(initialAuthor);
      setContent(initialContent);
    }
  }, [isOpen, initialTitle, initialAuthor, initialContent]);

  const resetTitle = () => {
    setTitle("");
  };

  async function handleEdit() {
    setIsLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const url =
        process.env.NEXT_PUBLIC_API_URL +
        `/questions/${data.session?.user.id}/${questionId}`;
      const question = {
        title: title,
        is_anonymous: isAnonymous,
        content: content,
      };
      await axios.put(url, question);
      handleGet();

      toast({
        title: "Your profile has been updated!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to update your profile",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="55%" minW="450px">
        <ModalHeader>Edit a Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            {/* Title フォーム */}
            <FormControl
              isInvalid={title.length > maxTitleLength || !title.trim()}
            >
              <FormLabel>title</FormLabel>
              <InputGroup>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="タイトルを入力"
                  maxLength={maxTitleLength}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    height="2rem"
                    minWidth="2rem"
                    bg="transparent"
                    color="gray.500"
                    fontSize="1.2rem"
                    _hover={{ bg: "transparent", color: "gray.700" }}
                    _active={{ bg: "transparent", color: "gray.900" }}
                    onClick={resetTitle}
                  >
                    ×
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text
                fontSize="sm"
                color={title.length > maxTitleLength ? "red.500" : "gray.500"}
              >
                {title.length}/{maxTitleLength}
              </Text>
            </FormControl>

            {/* Author フォーム */}
            <FormControl>
              <FormLabel>Author</FormLabel>
              <HStack spacing={4} align="center">
                <Text fontSize="md" color="gray.700">
                  {isAnonymous ? "匿名" : author}
                </Text>
                <Switch
                  colorScheme="teal"
                  isChecked={!isAnonymous}
                  onChange={() => {
                    setIsAnonymous(!isAnonymous);
                    if (isAnonymous) {
                      setAuthor(initialAuthor);
                    } else {
                      setAuthor("匿名");
                    }
                  }}
                />
                <Text fontSize="sm" color="gray.500">
                  {isAnonymous ? "匿名で投稿" : "表示名で投稿"}
                </Text>
              </HStack>
            </FormControl>

            {/* Content フォーム */}
            <FormControl isInvalid={content.length > maxContentLength}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="質問の内容を編集してください"
                maxLength={maxContentLength}
              />
              <Text
                fontSize="sm"
                color={
                  content.length > maxContentLength ? "red.500" : "gray.500"
                }
              >
                {content.length}/{maxContentLength}
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleEdit} isLoading={isLoading}>
            Save
          </Button>
          <Button
            variant="ghost"
            ml={3}
            onClick={onClose}
            isLoading={isLoading}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
