import { Input } from "@chakra-ui/input";
import { Box, Container, Flex } from "@chakra-ui/layout";
import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useConversationFromIdQuery,
  useMeQuery,
  useMessageSentSubscription,
  useSendMessageMutation,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { MessageBox } from "./MessageBox";

export const Chat = ({ id }) => {
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
    return <Box>Could not find the user</Box>;
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
    <>
      {data ? (
        <Container mt={5}>
          {messages.map((m) => {
            return (
              <MessageBox
                sender={m.author.username}
                message={m.text}
                isMine={me.me.username === m.author.username}
              />
            );
          })}
        </Container>
      ) : (
        <Center mt={200}>
          <Spinner />
        </Center>
      )}
      <Flex px={4} height={20} alignItems="center">
        <Input
          placeholder="Type a message"
          size="lg"
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
    </>
  );
};
