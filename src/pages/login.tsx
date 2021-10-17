import {
  Box, Button, Flex, FormLabel, Heading, Link, Stack, Text,
  useColorModeValue
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const Login = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"pink.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login(values);
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    if (typeof router.query.next == "string") {
                      router.push(router.query.next);
                    } else {
                      router.back();
                    }
                  }
                }}
              >
                {(props) => (
                  <Form>
                      <FormLabel>Username</FormLabel>
                      <InputField
                        type="username"
                        name="username"
                        placeholder="username"
                      />
                      <FormLabel>Password</FormLabel>
                      <InputField
                        type="password"
                        name="password"
                        placeholder="password"
                      />
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Link href="/forgot-password" ml={199} mt={2} color={"pink.400"}>Forgot password?</Link>
                      </Stack>
                      <Button
                        color={"white"}
                        _hover={{
                          bgGradient: "linear(to-r, red.400,pink.400)",
                          boxShadow: "xl",
                        }}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        type="submit"
                        isLoading={props.isSubmitting}
                      >
                        Sing in
                      </Button>
                      <NextLink href="/register">
                        <Link color={"pink.400"}>Not a member?</Link>
                      </NextLink>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(Login);
