import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Spinner,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useCreateProfileMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAuth } from "../utils/useAuth";

export const CreateProfile = ({}) => {
  const router = useRouter();
  useAuth();
  const [bio, setBio] = useState("");
  const [, createProfile] = useCreateProfileMutation();
  const [{ data, fetching }] = useMeQuery();
  if (fetching) {
    <Center mt={200}>
      <Spinner />
    </Center>;
  }

  return (
    <Layout>
      {data! ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Tell us something about you
            </Heading>
            <FormControl id="email">
              <Textarea
                _placeholder={{ color: "gray.500" }}
                placeholder="BIO"
                size="lg"
                h={200}
                resize={"none"}
                onChange={(event) => {
                  setBio(event.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  createProfile({ bio: bio });
                  router.back();
                }}
              >
                Upload BIO
              </Button>
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              You are not logged in
            </Heading>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProfile);
