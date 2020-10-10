import React from "react";
import { Button } from "@chakra-ui/core";

interface TagProps {
  tagName: string;
}
const Tags = ({ tagName }: TagProps) => {
  return (
    <Button aria-label={tagName} as="button" className="tags">
      #{tagName}
    </Button>
  );
};

export default Tags;
