import { Box, Flex, Heading, Link, Stack } from "@chakra-ui/layout";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { useActiveConversationsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAuth } from "../utils/useAuth";

const Conversations = () => {
  const [{ data: conversations }] = useActiveConversationsQuery();
  useAuth();
  return (
    <Layout>
      <Flex>
        <Stack ml={10}>
          <Heading mt={95} ml={510}>
            Active Conversations
          </Heading>
          {!conversations ? (
            <Center mt={200} ml={700}>
              <Spinner />
            </Center>
          ) : (
            conversations.activeConversations.map((c) => {
              if (!c) {
                return null;
              } else {
                return (
                  <>
                    <Flex key={c.id} mt={100}>
                      <Box ml={100}>
                        <Link>
                          <NextLink href="/chat/[id]" as={`chat/${c.id}`}>
                            <Box p="4">
                              <Stack
                                color={"white"}
                                w={600}
                                _hover={{
                                  bgGradient: "linear(to-r, red.400,pink.400)",
                                  boxShadow: "xl",
                                }}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                rounded={"xl"}
                                p={{ base: 5, sm: 5, md: 4 }}
                                maxW={{ lg: "lg" }}
                                ml={320}
                              >
                                <Text
                                  ml={150}
                                  fontSize="xl"
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                >
                                  Participants{" "}
                                </Text>
                                <Flex>
                                  {c.participants.map((p) => {
                                    return (
                                      <Box key={p.user.id}>
                                        <Text
                                          fontSize="lg"
                                          fontFamily="monospace"
                                          fontWeight="bold"
                                        >
                                          {p.user.username.concat(",")}
                                        </Text>
                                      </Box>
                                    );
                                  })}
                                </Flex>
                              </Stack>
                            </Box>
                          </NextLink>
                        </Link>
                      </Box>
                    </Flex>
                  </>
                );
              }
            })
          )}
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Conversations);
