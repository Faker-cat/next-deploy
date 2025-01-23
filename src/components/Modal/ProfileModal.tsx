import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  // 仮のデフォルト値（本来はユーザー情報を受け取るべき）
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    // 保存処理をここに追加 (例: APIコール)
    console.log("プロフィール更新", { name, bio });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mx="auto"
        mt="auto"
        my="auto"
        maxW="lg"
        bgGradient="linear(to-br, teal.100)"
        boxShadow="lg"
        borderRadius="xl"
        overflow="hidden"
      >
        <Box bgGradient="linear(to-r, teal.500, green.400)" py={6} px={4}>
          <ModalHeader
            color="white"
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color="white" />
        </Box>
        <ModalBody px={8} py={6}>
          <VStack spacing={6} align="stretch">
            {/* 名前 */}
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="medium" color="teal.700">
                Name
              </FormLabel>
              <Input
                type="text"
                placeholder="名前をいれてください"
                value={name}
                onChange={(e) => setName(e.target.value)}
                focusBorderColor="teal.400"
                borderColor="teal.200"
              />
            </FormControl>

            {/* 自己紹介 */}
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="medium" color="teal.700">
                Biography
              </FormLabel>
              <Input
                type="text"
                placeholder="自己紹介を書いてね"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                focusBorderColor="teal.400"
                borderColor="teal.200"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" py={6}>
          <Button
            colorScheme="teal"
            px={6}
            py={2}
            fontSize="md"
            fontWeight="medium"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
