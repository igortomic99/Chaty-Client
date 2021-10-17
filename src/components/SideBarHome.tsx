import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  Text,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useFollowersQuery } from "../generated/graphql";
import NextLink from "next/link";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [{ data: followers, error, fetching }] = useFollowersQuery();
  const router = useRouter();
  if (fetching) {
    return (
      <Center mt={200}>
        <Spinner />
      </Center>
    );
  }
  if (!followers) {
    return (
      <>
        <Box
          bg={useColorModeValue("white", "gray.900")}
          borderRight="1px"
          borderRightColor={useColorModeValue("gray.200", "gray.700")}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
          {...rest}
        >
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <CloseButton
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
            />
          </Flex>
          <Text
            fontSize="xl"
            fontFamily="monospace"
            fontWeight="bold"
            align="center"
          >
            Login or register
          </Text>
          <Text
            fontSize="xl"
            fontFamily="monospace"
            fontWeight="bold"
            align="center"
          >
            to see who is online
          </Text>
          <Button
            fontFamily={"heading"}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
            w={"100%"}
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        </Box>
      </>
    );
  }
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mt={12}
      >
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold" ml={7}>
          Followers
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack ml={9} mt={-3}>
        {!followers ? (
          <Center mt={200}>
            <Spinner />
          </Center>
        ) : (
          followers.followers.map((f) =>
            !f ? null : (
              <Flex key={f.id}>
                <Avatar
                  src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                  alt={"Author"}
                  size={"md"}
                  mr={3}
                  mb={3}
                />
                <Box mt={"2"}>
                  <Link>
                    <NextLink
                      href="/particularProfile/[id]"
                      as={`particularProfile/${f.id}`}
                    >
                      <Heading size="md">{f.username}</Heading>
                    </NextLink>
                  </Link>
                </Box>
              </Flex>
            )
          )
        )}
      </Stack>
    </Box>
  );
};
