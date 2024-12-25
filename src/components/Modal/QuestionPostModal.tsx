import {
  Button,
  FormControl,
  FormLabel,
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
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionPostModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [author, setAuthor] = useState("匿名");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const maxTitleLength = 50;
  const maxBodyLength = 500;
  const maxTagLength = 8;
  const maxTags = 5;
  const maxAuthorLength = 30; // 投稿者名の文字数制限

  const handleAddTag = () => {
    if (tags.length >= maxTags) {
      toast({
        title: "タグは最大5つまでです",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (newTag.length > maxTagLength) {
      toast({
        title: `タグは最大${maxTagLength}文字です`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!newTag.trim()) {
      toast({
        title: "空のタグは追加できません",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTags([...tags, newTag]);
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // ここに送信処理を実装
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Your question has been posted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }, 1000);
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
    setAuthor(isAnonymous ? "" : "匿名");
  };

  // タイトルのリセット
  const resetTitle = () => {
    setTitle("");
  };

  // タグのリセット
  const resetTags = () => {
    setNewTag("");
  };

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
                    height="2rem" // ボタンの高さを調整
                    minWidth="2rem" // ボタンの幅を調整
                    bg="transparent" // 背景を透明に
                    color="gray.500" // 色を入力欄に合わせる
                    fontSize="1.2rem" // 文字サイズを調整
                    _hover={{ bg: "transparent", color: "gray.700" }} // ホバー時の色
                    _active={{ bg: "transparent", color: "gray.900" }} // クリック時の色
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
              <Switch
                isChecked={isAnonymous}
                onChange={toggleAnonymous}
                color={!isAnonymous ? "gray.500" : "black"}
              >
                匿名
              </Switch>

              {/* 匿名ではない場合、投稿者名の入力フォームを表示 */}
              {!isAnonymous && (
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="投稿者名"
                  maxLength={maxAuthorLength}
                />
              )}
            </FormControl>
            <FormControl isInvalid={body.length > maxBodyLength}>
              <FormLabel>Body</FormLabel>
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
              <VStack align="start" spacing={2}>
                <InputGroup mb={4}>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="タグを入力"
                    maxLength={maxTagLength}
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      height="2rem" // ボタンの高さを調整
                      minWidth="2rem" // ボタンの幅を調整
                      bg="transparent" // 背景を透明に
                      color="gray.500" // 色を入力欄に合わせる
                      fontSize="1.2rem" // 文字サイズを調整
                      _hover={{ bg: "transparent", color: "gray.700" }} // ホバー時の色
                      _active={{ bg: "transparent", color: "gray.900" }} // クリック時の色
                      onClick={resetTags}
                    >
                      ×
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Text
                  fontSize="sm"
                  color={newTag.length > maxTagLength ? "red.500" : "gray.500"}
                >
                  {newTag.length}/{maxTagLength}
                </Text>
                <Button
                  onClick={handleAddTag}
                  size="sm"
                  isDisabled={newTag.length > maxTagLength || !newTag.trim()}
                >
                  Add Tag
                </Button>
                <VStack align="start">
                  {tags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </VStack>
              </VStack>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={
              !title.trim() ||
              !body.trim() ||
              title.length > maxTitleLength ||
              body.length > maxBodyLength ||
              (!isAnonymous && !author.trim()) // 投稿者名が必要
            }
          >
            Post！
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
