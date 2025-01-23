import supabase from "@/libs/supabase";
import { User } from "@/types/user";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fetchQuestionAndAnswers: () => void;

  userDisplayName?: string; // 表示名のプロパティ
}

export function AnswerPostModal({
  isOpen,
  onClose,
  fetchQuestionAndAnswers,
}: Props) {
  const [body, setBody] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [author, setAuthor] = useState("匿名");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState<User>();

  const maxBodyLength = 500;

  // 投稿者名を設定する処理
  // useEffect(() => {
  //   if (userDisplayName) {
  //     setAuthor(userDisplayName);
  //     setIsAnonymous(false); // 表示名があれば匿名ではない
  //   } else {
  //     setAuthor("匿名");
  //     setIsAnonymous(true); // 表示名がない場合は匿名
  //   }
  // }, [userDisplayName]);

  const handleSubmit = () => {
    setIsLoading(true);
    // ここに送信処理を実装
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Your answer has been posted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose(); // モーダル閉じる
    }, 1000);
  };

  // モーダルが閉じられる際に状態をリセットする
  useEffect(() => {
    if (!isOpen) {
      setBody("");
      setIsAnonymous(true);
      setAuthor("匿名");
    }

    if (isOpen) GetUser();
  }, [isOpen]);

  async function handlePost() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      const url = process.env.NEXT_PUBLIC_API_URL + "/answers";
      const answer = {
        user_id: data.session?.user.id,
        is_anonymous: isAnonymous,
        content: body,
      };
      const res = await axios.post(url, answer);
      fetchQuestionAndAnswers();
      toast({
        title: "Your answer has been posted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to add your answer",
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
        throw new Error("Failed to fetch answers");
      }
      setUser(res.data as User);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="50%" minW="400px">
        <ModalHeader>Post an Answer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <HStack spacing={4} align="center">
                <Text fontSize="md" color="gray.700">
                  {isAnonymous ? "匿名" : author}{" "}
                  {/* 匿名時には「匿名」を表示 */}
                </Text>
                {/* 匿名か表示名を切り替えるためのSwitchコンポーネント */}
                <Switch
                  colorScheme="teal"
                  isChecked={!isAnonymous}
                  onChange={() => {
                    // userDisplayNameがnullの場合はトーストを表示
                    if (user?.display_name === null) {
                      toast({
                        title: "ユーザー名が設定されていません",
                        description:
                          "User Pageにてユーザー名を設定してください。",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        containerStyle: {
                          width: "80%", // 親要素に対しての相対的な横幅指定
                          maxWidth: "450px", // 最大横幅の指定
                        },
                      });
                      return; // 状態の切り替えは行わない
                    }

                    // userDisplayNameがnullでない場合、状態を切り替え
                    setIsAnonymous(!isAnonymous);
                    if (isAnonymous) {
                      setAuthor(user?.display_name || "匿名"); // 表示名がある場合にそれを設定
                    } else {
                      setAuthor(""); // 表示名を切り替える
                    }
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
                placeholder="回答の内容を入力してください"
                maxLength={maxBodyLength}
              />
              <Text
                fontSize="sm"
                color={body.length > maxBodyLength ? "red.500" : "gray.500"}
              >
                {body.length}/{maxBodyLength}
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handlePost}
            isLoading={isLoading}
            isDisabled={!body.trim() || body.length > maxBodyLength}
          >
            Post!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
