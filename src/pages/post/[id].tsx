import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { usePostQuery, useUpdatePostMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useAuth } from "../../utils/useAuth";

const EditPost = () => {
  const router = useRouter();
  const id = router.query.id as any;
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  useAuth();
  if (fetching) {
    return (
      <Center mt={200}>
        <Spinner />
      </Center>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.800")}
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
            Update post
          </Heading>
          <Formik
            initialValues={{
              newTitle: data.post.title,
              newContent: data.post.content,
            }}
            onSubmit={async (values) => {
              await updatePost({ id, ...values });
              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="newTitle"
                  placeholder="Title"
                  type="newTitle"
                />
                <Box mt={4}>
                  <InputField
                    textarea
                    name="newContent"
                    type="newContent"
                    placeholder="content..."
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  bgGradient="linear(to-r, red.400,pink.400)"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  Update post
                </Button>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost as any);
