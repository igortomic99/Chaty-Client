import { Box } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { MeQuery, Message } from "../generated/graphql";
import { MessageBox } from "./MessageBox";

export type MessageFeedProps = {
  messages: Message[];
  me: MeQuery;
};

const MessageFeed: React.FC<MessageFeedProps> = ({ me, messages }) => {
  return (
    <ScrollableFeed>
      <Box p={6}>
        {messages?.map((message: any, key) => (
          <MessageBox
            message={message}
            sender={me.me.username}
            isMine={me.me.username === message.author.username}
            key={key}
          />
        ))}
      </Box>
    </ScrollableFeed>
  );
};

export default MessageFeed;
