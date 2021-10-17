import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Layout } from "../components/Layout";
import { MobileNav } from "../components/MobileNav";
import { PostCard } from "../components/PostCard";
import { SidebarContent } from "../components/SidebarContents";
import { useProfileQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAuth } from "../utils/useAuth";

const Profile = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  useAuth();
  const [{ data, fetching }] = useProfileQuery();
  if (fetching) {
    return (
      <Center mt={100}>
        <Spinner />
      </Center>
    );
  }
  return (
    <Layout>
      {data ? (
        <>
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
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
              {children}
              <Center py={6} bg={useColorModeValue("gray.100", "gray.900")}>
                <Flex
                  h={70}
                  mt={-5}
                  bg={useColorModeValue("gray.100", "gray.900")}
                >
                  <Box borderBottom="1px">
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
                      {data.profile.user.username}
                    </Heading>
                    <Text mt={1}>
                      {" "}
                      {data.profile.user._count.posts} posts{" "}
                      {data.profile.user._count.followedBy} followers{" "}
                      {data.profile.user._count.following} following
                    </Text>
                    <Text
                      fontSize={"xl"}
                      color={useColorModeValue("gray.700", "gray.400")}
                      mb={50}
                    >
                      {data.profile.bio}
                    </Text>
                  </Box>
                </Flex>
              </Center>
            </Box>
          </Box>
          <Flex
            bg={useColorModeValue("gray.100", "gray.900")}
            mt={-500}
            ml={150}
          >
            <PostCard posts={data?.profile?.user?.posts} />
          </Flex>
        </>
      ) : (
        <Box p="4" m={"150"}>
          <Stack
            color={"gray.100"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
            bgGradient="linear(to-r, red.400,pink.400)"
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            ml={320}
          >
            <Stack spacing={4}>
              <Heading
                color={"white"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Create Profile
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"white"} fontSize={{ base: "sm", sm: "md" }}>
                Looks like you dont have profile created yet, create on in
                couple of minutes!
              </Text>
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bg="white"
              color={"pink.400"}
              borderColor="white"
              onClick={() => {
                router.push("/create-profile");
              }}
            >
              Create Profile
            </Button>
            form
          </Stack>
        </Box>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
