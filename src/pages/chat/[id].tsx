import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout";
import { MessageBox } from "../../components/MessageBox";
import {
  useMessageSentSubscription,
  useConversationFromIdQuery,
  useMeQuery,
  useSendMessageMutation,
  useReadMessageMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import ScrollableFeed from "react-scrollable-feed";
import { useAuth } from "../../utils/useAuth";

const Chat = () => {
  const router = useRouter();
  useAuth();
  const id = router.query.id as any;
  const [{ data, fetching }] = useConversationFromIdQuery({
    variables: {
      id,
    },
  });
  const [{ data: me }] = useMeQuery({
    pause: isServer(),
  });
  const [{ data: newMessage }] = useMessageSentSubscription();
  const [messages, setMessages] = useState([]);
  const [, sendMessage] = useSendMessageMutation();
  const [, readMessages] = useReadMessageMutation();
  useEffect(() => {
    if (data?.conversationFromId) {
      setMessages(data.conversationFromId.messages);
    }
  }, [data]);
  useEffect(() => {
    if (data?.conversationFromId && messages && newMessage) {
      setMessages([...messages, newMessage.messageSent]);
    }
  }, [newMessage]);

  if (fetching) {
    return (
      <Center mt={200}>
        <Spinner />
      </Center>
    );
  }
  if (!data?.conversationFromId) {
    return (
      <Center mt={200}>
        <Box>Could not find the user</Box>
      </Center>
    );
  }
  const emitMessage = async (text: string, conversationId: string) => {
    const sender = me.me;
    if (sender) {
      await sendMessage({
        conversationId,
        text,
      });
    }
  };
  return (
    <Layout>
      <Flex
        mb={69}
        onLoad={() => {
          router.reload();
        }}
        onPointerEnter={async () => {
          await readMessages({ id });
        }}
      >
        {data ? (
          <Container
            mt={20}
            borderRight="1px"
            borderLeft="1px"
            borderColor="gray.700"
          >
            <ScrollableFeed forceScroll={true}>
              {messages.map((m) => {
                return (
                  <MessageBox
                    sender={m.author.username}
                    message={m.text}
                    isMine={me.me.username === m.author.username}
                  />
                );
              })}
            </ScrollableFeed>
          </Container>
        ) : (
          <Center mt={200}>
            <Spinner />
          </Center>
        )}
      </Flex>
      <Flex
        px={4}
        height={20}
        alignItems="center"
        pos="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex={2}
        mt={642}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Input
          placeholder="Type a message"
          size="lg"
          w={520}
          ml={485}
          bg={useColorModeValue("white", "gray.800")}
          _focus={{
            outline: "none",
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              emitMessage(event.currentTarget.value, id);
              event.currentTarget.value = "";
            }
          }}
        />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Chat as any);
