import {
  Box,
  Button,
  Flex,
  Link,
  useColorModeValue,
  Text,
  Heading,
  Avatar,
  Badge,
  Center,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Profile, useFindByUsernameMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Explore = () => {
  const router = useRouter();
  const [, find] = useFindByUsernameMutation();
  const [user, setUser] = useState<Profile>();
  const [message, setMessage] = useState("");
  return (
    <Layout>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async (values, { setErrors }) => {
          const result = await find(values);
          if (result.data?.findByUsername) {
            setUser(result.data?.findByUsername as any);
          } else {
            if (result.error.message.includes("Profile not created")) {
              setMessage("This user did not create profile yet!");
            }
            if (result.error.message.includes("user does not exist")) {
              setMessage("This user does not exists!");
            }
          }
        }}
      >
        {(props) => (
          <>
            <Form>
              <Flex
                minH={"20vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                mt={39}
              >
                <Box mr={2} w={500}>
                  <InputField
                    type="username"
                    placeholder="Username"
                    name="username"
                  />
                </Box>
                <Box mt={2}>
                  <Button
                    color={"white"}
                    type="submit"
                    _hover={{
                      bgGradient: "linear(to-r, red.400,pink.400)",
                      boxShadow: "xl",
                    }}
                    bgGradient="linear(to-r, red.400,pink.400)"
                  >
                    Search
                  </Button>
                </Box>
              </Flex>
            </Form>

            <Flex mt={50} mr={350} align={"center"} justify={"center"}>
              <NextLink
                href="/particularProfile/[id]"
                as={`particularProfile/${user?.user.id}`}
              >
                <Link>
                  {user || message ? (
                    <Box p="4">
                      <Stack
                        color={"white"}
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
                            {message && !user ? message : user.user.username}
                          </Heading>
                          {user ? (
                            <Text
                              color={"white"}
                              fontSize={{ base: "sm", sm: "md" }}
                            >
                              {user.bio}
                            </Text>
                          ) : (
                            <Text
                              color={"white"}
                              fontSize={{ base: "sm", sm: "md" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua!
                            </Text>
                          )}
                        </Stack>
                        {user ? (
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
                            Visit Profile
                          </Button>
                        ) : null}
                        form
                      </Stack>
                    </Box>
                  ) : null}
                </Link>
              </NextLink>
            </Flex>
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Explore);
