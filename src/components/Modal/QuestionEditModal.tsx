import { Tag } from "@/types/tag";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { MultiSelect } from "chakra-multiselect";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleGet: () => void;
  userDisplayName?: string;
  questionId: string;
  userId: string;
}

interface Option {
  label: string;
  value: string | number;
}

export function QuestionEditModal({
  isOpen,
  onClose,
  handleGet,
  questionId,
  userId,
}: Props) {
  const [title, setTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [author, setAuthor] = useState("匿名");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const maxTitleLength = 50;
  const maxBodyLength = 500;
  const maxTags = 5;

  useEffect(() => {
    async function fetchQuestionData() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/questions/${userId}/${questionId}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          const { title, content, is_anonymous, tags } = res.data;
          setTitle(title);
          setBody(content);
          setIsAnonymous(is_anonymous);
          setSelectedTags(
            tags.map((tag: Tag) => ({
              label: tag.name,
              value: tag.id.toString(),
            }))
          );
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Failed to fetch question data",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }

    async function fetchTags() {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/tags";
        const res = await axios.get(url);
        if (res.status === 200) {
          setTags(res.data as Tag[]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (isOpen) {
      fetchQuestionData();
      fetchTags();
    } else {
      setTitle("");
      setBody("");
      setSelectedTags([]);
    }
  }, [isOpen, questionId, userId]);

  async function handleEdit() {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/questions/${userId}/${questionId}`;
      const payload = {
        title,
        is_anonymous: isAnonymous,
        content: body,
      };
      const res = await axios.put(url, payload);

      if (res.status === 200) {
        handleGet();
        toast({
          title: "Question updated successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to update question");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to update question",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
            <FormControl
              isInvalid={title.length > maxTitleLength || !title.trim()}
            >
              <FormLabel>Title</FormLabel>
              <InputGroup>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                  maxLength={maxTitleLength}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    onClick={() => setTitle("")}
                    bg="transparent"
                    _hover={{ bg: "transparent", color: "gray.700" }}
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

            <FormControl>
              <FormLabel>Author</FormLabel>
              <HStack>
                <Text>{isAnonymous ? "匿名" : author}</Text>
                <Switch
                  isChecked={!isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                />
              </HStack>
            </FormControl>

            <FormControl isInvalid={body.length > maxBodyLength}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter question details"
                maxLength={maxBodyLength}
              />
              <Text
                fontSize="sm"
                color={body.length > maxBodyLength ? "red.500" : "gray.500"}
              >
                {body.length}/{maxBodyLength}
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel>Tags</FormLabel>
              <MultiSelect
                options={tags.map((tag) => ({
                  label: tag.name,
                  value: tag.id.toString(),
                }))}
                value={selectedTags}
                onChange={(value) =>
                  setSelectedTags(Array.isArray(value) ? value : [value])
                }
              />
              <Text fontSize="sm" color="gray.500">
                {selectedTags.length}/{maxTags} tags selected
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleEdit}
            isLoading={isLoading}
            isDisabled={
              !title.trim() ||
              !body.trim() ||
              title.length > maxTitleLength ||
              body.length > maxBodyLength
            }
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
