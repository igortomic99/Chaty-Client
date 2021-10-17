import { Avatar } from "@chakra-ui/avatar";
import { Flex, Box, Link, Heading } from "@chakra-ui/layout";
import React from "react";
import { useFollowersQuery } from "../generated/graphql";
import NextLink from "next/link";

export const Followers = () => {
  const [{ data: followers }] = useFollowersQuery();
  return (
    <>
      {followers.followers.map((f) =>
        !f ? (
          <Heading
            color={"white"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            You dont have any followers!
          </Heading>
        ) : (
          <Flex>
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
      )}
    </>
  );
};
