import supabase from "@/libs/supabase";
import { Tag } from "@/types/tag";
import { User } from "@/types/user";
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
}

interface Option {
  label: string;
  value: string | number;
}

export function QuestionPostModal({ isOpen, onClose, handleGet }: Props) {
  const [title, setTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [author, setAuthor] = useState("匿名");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState<User>();

  const maxTitleLength = 50;
  const maxBodyLength = 500;
  const maxTags = 5;

  // const userDisplayName = "Faker"

  // useEffect(() => {
  //   if (userDisplayName) {
  //     setAuthor(userDisplayName);
  //     setIsAnonymous(false);
  //   } else {
  //     setAuthor("匿名");
  //     setIsAnonymous(true);
  //   }
  // }, [userDisplayName]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setIsAnonymous(true);
      setAuthor("匿名");
      setBody("");
      setSelectedTags([]);
      // setNewTag("");
    }

    async function GetTags() {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/tags";
        const res = await axios.get(url);
        if (res.status === 200 && Array.isArray(res.data)) {
          setTags(res.data as Tag[]);
        } else {
          setTags([]); // 空配列に設定
        }
        setTags(res.data as Tag[]);
      } catch (err) {
        console.error(err);
        setTags([]);
      }
    }

    if (isOpen) {
      GetTags(), GetUser();
    }
  }, [isOpen]);

  const resetTitle = () => {
    setTitle("");
  };

  const options = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Chakra UI",
    "CSS",
    "HTML",
    "Node.js",
    "Python",
    "SQLAlchemy",
  ].map((tag) => ({
    label: tag,
    value: tag,
  }));

  async function handlePost() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      const url = process.env.NEXT_PUBLIC_API_URL + "/questions";
      const question = {
        title: title,
        user_id: data.session?.user.id,
        is_anonymous: isAnonymous,
        content: body,
        tag_id: selectedTags.map((tag) => tag.value),
      };
      const res = await axios.post(url, question);
      handleGet();
      toast({
        title: "Your question has been posted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to add your question",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  async function GetUser() {
    try {
      const { data, error } = await supabase.auth.getSession();
      const url =
        process.env.NEXT_PUBLIC_API_URL + `/users/${data.session?.user.id}`;
      const res = await axios.get(url);
      if (res.status !== 200) {
        throw new Error("Failed to fetch questions");
      }
      setUser(res.data as User);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="55%" minW="450px">
        <ModalHeader>Post a Question</ModalHeader>
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
                    // if (userDisplayName === null) {
                    //   toast({
                    //     title: "ユーザー名が設定されていません",
                    //     description:
                    //       "User Pageにてユーザー名を設定してください。",
                    //     status: "warning",
                    //     duration: 3000,
                    //     isClosable: true,
                    //   });
                    //   return;
                    // }
                    setIsAnonymous(!isAnonymous);
                    setAuthor(isAnonymous ? user?.display_name || "匿名" : "");
                  }}
                />
                <Text fontSize="sm" color="gray.500">
                  {isAnonymous ? "匿名で投稿" : "表示名で投稿"}
                </Text>
              </HStack>
            </FormControl>

            <FormControl isInvalid={body.length > maxBodyLength}>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="質問の内容を入力"
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
                options={tags.map((tag) => {
                  return {
                    label: tag.name,
                    value: tag.id.toString(),
                  } as Option;
                })}
                value={selectedTags}
                onChange={(value) =>
                  setSelectedTags(Array.isArray(value) ? value : [value])
                }
                placeholder="タグを選択"
                // closeOnSelect={false}
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
            onClick={handlePost}
            isLoading={isLoading}
            isDisabled={
              !title.trim() ||
              !body.trim() ||
              title.length > maxTitleLength ||
              body.length > maxBodyLength ||
              (!isAnonymous && !author.trim())
            }
          >
            Post！
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
