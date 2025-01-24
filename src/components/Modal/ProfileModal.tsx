import supabase from "@/libs/supabase";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  GetUser: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  GetUser,
}) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    setIsLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const url =
        process.env.NEXT_PUBLIC_API_URL + `/users/${data.session?.user.id}`;
      const profile = {
        display_name: name,
        bio: bio,
      };
      await axios.put(url, profile);
      GetUser();

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

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setBio("");
    }
  }, [isOpen]);

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
                placeholder="自己紹介を書いてください"
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
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
