import {
  Avatar,
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
  const [name, setName] = useState("Faker");
  const [bio, setBio] = useState("Web developer, React enthusiast.");
  const [avatar, setAvatar] = useState("/avatar.png");

  const handleSave = () => {
    // 保存処理をここに追加 (例: APIコール)
    console.log("プロフィール更新", { name, bio, avatar });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mx="auto" // 左右中央揃え
        mt="auto" // 上下中央揃え
        my="auto" // 上下方向の余白を自動調整
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* プロフィール画像 */}
            <FormControl textAlign="center">
              <Avatar size="xl" src={avatar} mb={4} mx="auto" />
              <Input
                type="text"
                placeholder="画像URLを入力"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </FormControl>

            {/* 名前 */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="名前を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            {/* 自己紹介 */}
            <FormControl>
              <FormLabel>Biography</FormLabel>
              <Input
                type="text"
                placeholder="自己紹介を入力"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
