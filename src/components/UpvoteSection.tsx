import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "loading-upvote" | "loading-downvote" | "not-loading "
  >("not-loading ");
  const [, vote] = useVoteMutation();
  return (
    <>
      <Box mr={4}>
        <Box>
          <IconButton
            aria-label="Upvote"
            fontSize="20px"
            icon={<AddIcon />}
            onClick={async () => {
              if (post.voteStatus === 1) {
                return;
              }
              setLoadingState("loading-upvote");
              await vote({
                postId: post.id,
                value: 1,
              });
              setLoadingState("not-loading ");
            }}
            isLoading={loadingState === "loading-upvote"}
            colorScheme={post.voteStatus === 1 ? "green" : undefined}
          />
        </Box>
        <Box align={"center"}>{post.points}</Box>
        <Box>
          <IconButton
            aria-label="Downvote"
            fontSize="20px"
            icon={<MinusIcon />}
            onClick={async () => {
              if (post.voteStatus === -1) {
                return;
              }
              setLoadingState("loading-downvote");
              await vote({
                postId: post.id,
                value: -1,
              });
              setLoadingState("not-loading ");
            }}
            isLoading={loadingState === "loading-downvote"}
            colorScheme={post.voteStatus === -1 ? "red" : undefined}
          />
        </Box>
      </Box>
    </>
  );
};
