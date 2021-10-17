import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCardNoE";
import {
  useAssingConversationMutation, useFollowMutation,
  useMeQuery,
  useProfileFromIdQuery, useUnfollowMutation
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [{ data, fetching }] = useProfileFromIdQuery({
    variables: {
      id,
    },
  });
  const [change, setChange] = useState(false);
  const [, assing] = useAssingConversationMutation();
  const [, follow] = useFollowMutation();
  const [, unfollow] = useUnfollowMutation();
  if (fetching) {
    return (
      <Center mt={200}>
        <Spinner />
      </Center>
    );
  }
  if (!data?.profileFromId) {
    return (
      <Center mt={200}>
        <Box>Could not find the user</Box>
      </Center>
    );
  }
  return (
    <Layout>
      <Flex h={70} mt={70}>
        <Box ml={400}>
          <Avatar
            size={"2xl"}
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
            mt={2}
          />
        </Box>
        <Box mt={2} ml={50} mb={100}>
          <Heading fontSize={"3xl"} fontFamily={"body"}>
            {data.profileFromId.user.username}
          </Heading>
          <Text mt={1} fontSize={"lg"}>
            {" "}
            {data.profileFromId.user._count.posts} posts{" "}
            {data?.profileFromId?.user?._count?.followedBy} followers{" "}
            {data.profileFromId.user._count.following} following
          </Text>
          <Text
            fontSize={"xl"}
            color={useColorModeValue("gray.700", "gray.400")}
            mb={50}
          >
            {data.profileFromId.bio}
          </Text>
          <Box>
            <Button
              fontSize={"sm"}
              rounded={"full"}
              w={"40"}
              onClick={async () => {
                const result = await assing({ id });
                const ID = result?.data?.assingConversation?.conversationId;
                const url = "/chat/".concat(ID);
                router.push(url);
              }}
            >
              Message
            </Button>
            {!change ? (
              <Button
                ml={3}
                w={"40"}
                fontSize={"sm"}
                rounded={"full"}
                onClick={async () => {
                  await follow({ userId: id });
                  setChange(true)
                }}
              >
                Follow
              </Button>
            ) : (
              <Button
                ml={3}
                w={"40"}
                fontSize={"sm"}
                rounded={"full"}
                onClick={async () => {
                  await unfollow({ userId: id });
                  setChange(false)
                }}
              >
                Unfollow
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
      <Stack bg={useColorModeValue("gray.100", "gray.900")} mt={139}>
        {data?.profileFromId?.user?._count.posts !== 0 ? (
          <PostCard posts={data?.profileFromId?.user?.posts} />
        ) : (
          <Center bg={useColorModeValue("gray.100", "gray.800")}>
            <Heading>This user has not posted anything yet</Heading>
          </Center>
        )}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
