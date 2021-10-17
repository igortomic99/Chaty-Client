import { Box, Button, Center, Flex, FormLabel, Heading, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useProfileQuery, useEditProfileMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useAuth } from "../utils/useAuth";


const EditProfile = () => {
  const router = useRouter();
  const id = router.query.id as any;
  useAuth();
  const [{ data, fetching }] = useProfileQuery();
  const [, updateProfile] = useEditProfileMutation();
  if (fetching) {
    return (
      <Center mt={200}>
        <Spinner />
      </Center>
    );
  }

  if (!data?.profile) {
    return (
      <Layout>
        <Box>Could not find profile</Box>
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
            Update profile
          </Heading>
      <Formik
        initialValues={{
          bio: data.profile?.bio,
          email: data.profile?.user?.email,
        }}
        onSubmit={async (values) => {
          await updateProfile({...values});
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
              <FormLabel>New email</FormLabel>
            <InputField name="email" placeholder="newEmail@newEmail.com" type="email" />
            <Box mt={4}>
            <FormLabel>New bio</FormLabel>
              <InputField
                textarea
                name="bio"
                type="bio"
                placeholder="bio..."
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              bgGradient="linear(to-r, red.400,pink.400)"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Update profile
            </Button>
          </Form>
        )}
      </Formik>
      </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditProfile as any);
