import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { UpvoteSection } from "./UpvoteSection";

export const PostCard = ({ posts }) => {
  return (
    <Flex ml={350} bg={useColorModeValue("gray.100", "gray.900")}>
      <Stack>
        {!posts ? (
          <Text>This user does not have any posts published yet!</Text>
        ) : (
          posts.map((p) => {
            if (!p) {
              return null;
            } else {
              return (
                <Center py={2} mt={50}>
                  <Box
                    maxW={"800px"}
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    boxShadow={"2xl"}
                    rounded={"md"}
                    p={6}
                    overflow={"hidden"}
                  >
                    <Flex mr={200}>
                      <Stack mr={100}>
                        <Text
                          color={"pink.500"}
                          textTransform={"uppercase"}
                          fontWeight={800}
                          fontSize={"sm"}
                          letterSpacing={1.1}
                          mr={600}
                        >
                          {p.title}
                        </Text>
                        <Heading
                          color={useColorModeValue("gray.700", "white")}
                          fontSize={"2xl"}
                          fontFamily={"body"}
                        >
                          {p.title}
                        </Heading>
                        <Box>
                          <Text
                            color={useColorModeValue("black", "white")}
                            mr={70}
                          >
                            {p.content}
                          </Text>
                        </Box>
                      </Stack>
                    </Flex>
                    <Flex>
                      <Stack
                        mt={2}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                      >
                        <Avatar
                          src={
                            "https://avatars0.githubusercontent.com/u/1164541?v=4"
                          }
                          alt={"Author"}
                          mt={1}
                          mb={-2}
                        />
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600} color={"pink.400"}>
                            {p.author.username}
                          </Text>
                          <Text color={"gray.500"}></Text>
                        </Stack>
                      </Stack>
                      <Box ml={600} mt={-70}>
                        <Box mt={-5} ml={1}>
                          <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                            <Link>
                              <CircleIcon />
                              <CircleIcon />
                            </Link>
                          </NextLink>
                        </Box>
                        <Box mt={3}>
                          <UpvoteSection post={p} />
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                </Center>
              );
            }
          })
        )}
      </Stack>
    </Flex>
  );
};

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);
