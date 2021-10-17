import {
  Avatar, Box, Button, Container,
  Heading,
  Stack,
  Text, useColorModeValue
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <Layout>
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Meeting{" "}
            <Text as={"span"} color={"pink.400"}>
              made easy🦄
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <NextLink href="/home">
            <Button
              rounded={"full"}
              px={6}
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              bgGradient="linear(to-r, red.400,pink.400)"
            >
              Get started
            </Button>
            </NextLink>
            <Button rounded={"full"} px={6}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Stack
        bg={useColorModeValue("white","dark")}
        py={16}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={"center"}
        direction={"column"}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign={"center"}
          maxW={"3xl"}
        >
          We had an incredible experience working with Chakra Templates and were
          impressed they made such a big difference in only three weeks. Our
          team is so grateful for the wonderful improvements they made and their
          ability to get familiar with the product concept so quickly.
        </Text>
        <Box textAlign={"center"}>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            }
            alt={"Jenny Wilson"}
            mb={2}
          />

          <Text fontWeight={600}>Jenny Wilson</Text>
          <Text
            fontSize={"sm"}
            color={useColorModeValue("gray.400", "gray.400")}
          >
            Vice President
          </Text>
        </Box>
      </Stack>
      <Container mt={10} mb={40} maxW={"100%"}>
      </Container>
      <Footer />
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient,{ssr:true})(Index);
