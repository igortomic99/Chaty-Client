import { Box } from "@chakra-ui/layout";
import React from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {
  variant?: "small" | "regular";
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
};
