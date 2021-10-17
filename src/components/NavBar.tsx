import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ fetching: LogoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const { colorMode, toggleColorMode } = useColorMode();
  let body = null;
  const isDark = colorMode === "dark";
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link>
            <Box>Login</Box>
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link ml={5}>
            <Box>Register</Box>
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{data?.me.username}</Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bgGradient="linear(to-r, red.400,pink.400)"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <NextLink href="/user-profile">
            <MenuItem>Profile</MenuItem>
          </NextLink>
          <NextLink href="/conversations">
            <MenuItem>Conversations</MenuItem>
          </NextLink>
          <MenuDivider />
          <MenuItem
            onClick={async () => {
              await logout();
              router.reload();
            }}
            isLoading={LogoutFetching}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
  return (
    <>
      <Box
        bgGradient="linear(to-r, red.400,pink.400)"
        px={4}
        pos="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex={2}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NextLink href="/">
              <Link>
                <Box>🦄</Box>
              </Link>
            </NextLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NextLink href={"/home"}>Home</NextLink>
              <NextLink href={"/explore"}>Explore</NextLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Box ml={2} mr={3}>
              <Switch
                right="1rem"
                color="white"
                isChecked={isDark}
                onChange={toggleColorMode}
              />
            </Box>
            <HStack spacing={{ base: "0", md: "6" }}>
              <IconButton
                size="lg"
                variant="ghost"
                aria-label="notification"
                icon={<FiBell />}
                mr={2}
              />
            </HStack>
            <Flex alignItems={"center"}>{body}</Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
