import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout>
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
            Enter your email to recover your account
          </Heading>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              const response = await forgotPassword(values);
              if (response) {
                setComplete(true);
              }
            }}
          >
            {({ isSubmitting }) =>
              complete ? (
                <Box>if acc with that email exist email has been sent</Box>
              ) : (
                <Form>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                  ></InputField>
                  <Box mt={1}></Box>
                  <Button
                    mt={2}
                    type="submit"
                    bgGradient="linear(to-r, red.400,pink.400)"
                    isLoading={isSubmitting}
                  >
                    Forgot password
                  </Button>
                </Form>
              )
            }
          </Formik>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword) ;
