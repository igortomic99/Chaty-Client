import { Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";

interface MessageProps {
  sender: String;
  isMine: Boolean;
  message: String;
}

export const MessageBox: React.FC<MessageProps> = ({
  isMine,
  sender,
  message,
}) => {
  return (
    <Flex my={2} p={2}>
      <Flex flexDirection="column" width="100%">
        <Tag
          variant="subtle"
          mb={2}
          bg={isMine ? "_purple" : "gray.500"}
          ml={isMine ? "auto" : undefined}
          mr={isMine ? undefined : "auto"}
        >
          {sender}
        </Tag>
        <Flex
          bg="gray.50"
          pr={2}
          py={2}
          pl={4}
          borderRadius={12}
          color="twitter.500"
          boxShadow="0 2px 2px #0f0f0f0f"
          ml={isMine ? "auto" : undefined}
          mr={isMine ? undefined : "auto"}
        >
          <Text fontSize={15} maxWidth={400}>
            {message}
          </Text>
          <Flex
            ml="auto"
            mt="auto"
            pl={4}
            alignItems="center"
            justifyContent="flex-end"
          ></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
