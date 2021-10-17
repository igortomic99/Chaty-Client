import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAuth } from "../utils/useAuth";
import { Formik, Form } from "formik";

const CreatePost = () => {
  const [, createPost] = useCreatePostMutation();
  useAuth();
  const router = useRouter();
  return (
    <Layout>
      <Flex
        minH={"80vh"}
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
            Create new post
          </Heading>
          <Formik
            initialValues={{ title: "", text: "" }}
            onSubmit={async (values, { setErrors }) => {
              const { error } = await createPost({ input: values });
              if (!error) {
                router.push("/home");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormControl id="title">
                  <FormLabel>Title</FormLabel>
                  <InputField name="title" placeholder="Title" type="title" />
                </FormControl>
                <FormControl id="text">
                  <FormLabel mt={3}>Content</FormLabel>
                  <InputField
                    textarea
                    placeholder="Content"
                    name="text"
                    type="text"
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    mt={5}
                    bg={"pink.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Create
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
