import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  Center,
  Drawer,
  DrawerContent,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { ReactNode, useState } from "react";
import { Layout } from "../components/Layout";
import { MobileNav } from "../components/MobileNav";
import { SidebarContent } from "../components/SideBarHome";
import { UpvoteSection } from "../components/UpvoteSection";
import { useArgumentedPostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home = ({ children }: { children: ReactNode }) => {
  const [number, setNumber] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching, error }] = useArgumentedPostQuery({
    variables: {
      numberPosts: number,
    },
  });
  let body = null;
  if (!fetching && !data) {
    return (
      <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
        Something went wrong
      </Text>
    );
  }
  return (
    <>
      <Layout>
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Text
              ml={"400"}
              fontSize="4xl"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Trending posts
            </Text>
            <Text ml={"340"} fontSize={"lg"} color={"gray.600"} mb={5}>
              Do you have something on your mind?{" "}
              <Link href="/create-post" color={"pink.400"}>
                Just post it
              </Link>{" "}
              ✌️
            </Text>
            <Stack>
              {!data ? (
                <Layout>
                  <Center mt={200}>
                    <Spinner />
                  </Center>
                </Layout>
              ) : (
                <Flex ml={150} bg={useColorModeValue("gray.100", "gray.900")}>
                  <Stack>
                    {data!.argumentedPost.posts.map((p) => {
                      if (!p) {
                        return null;
                      } else {
                        return (
                          <Center py={2} key={p.id}>
                            <Box
                              maxW={"800px"}
                              w={"full"}
                              bg={useColorModeValue("white", "gray.800")}
                              boxShadow={"2xl"}
                              rounded={"md"}
                              p={6}
                              overflow={"hidden"}
                            >
                              <Flex mr={50}>
                                <Stack mr={50}>
                                  <Text
                                    color={"pink.500"}
                                    textTransform={"uppercase"}
                                    fontWeight={800}
                                    fontSize={"sm"}
                                    letterSpacing={1.1}
                                    mr={400}
                                  >
                                    {p.title}
                                  </Text>
                                  <Heading
                                    color={useColorModeValue(
                                      "gray.700",
                                      "white"
                                    )}
                                    fontSize={"2xl"}
                                    fontFamily={"body"}
                                  >
                                    {p.title}
                                  </Heading>
                                  <Text
                                    color={useColorModeValue("black", "white")}
                                    mr={10}
                                  >
                                    {p.content}
                                  </Text>
                                </Stack>
                              </Flex>
                              <Flex>
                                <Stack
                                  mt={2}
                                  direction={"row"}
                                  spacing={4}
                                  align={"center"}
                                >
                                  {" "}
                                  <NextLink
                                    href="/particularProfile/[id]"
                                    as={`particularProfile/${p.author.id}`}
                                  >
                                    <Avatar
                                      src={
                                        "https://avatars0.githubusercontent.com/u/1164541?v=4"
                                      }
                                      alt={"Author"}
                                      mt={1}
                                      mb={-2}
                                    />
                                  </NextLink>
                                  <Stack
                                    direction={"column"}
                                    spacing={0}
                                    fontSize={"sm"}
                                  >
                                    <Text fontWeight={600} color={"pink.400"}>
                                      {p.author.username}
                                    </Text>
                                    <Text color={"gray.500"}></Text>
                                  </Stack>
                                </Stack>
                                <Box ml={600} mt={-70}>
                                  <UpvoteSection post={p} />
                                </Box>
                              </Flex>
                            </Box>
                          </Center>
                        );
                      }
                    })}
                  </Stack>
                </Flex>
              )}
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              ml={480}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              type="submit"
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              onClick={() => {
                setNumber(number + 10);
              }}
            >
              Load more
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
