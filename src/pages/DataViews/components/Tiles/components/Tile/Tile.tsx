import { Heading, VStack, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { tileStyles } from "./TileStyles";
interface TitleProps {
  name: string;
  body: string;
  email: string;
}

const Tile = ({ name, body, email }: TitleProps) => {
  return (
    <VStack css={tileStyles()}>
      <Heading
        size="sm"
        mt="4"
        mb="4"
        textAlign="left"
        textTransform="uppercase"
      >
        {name}
      </Heading>
      <Text textAlign="left" h="70%">
        {body}
      </Text>
      <Heading size="xs" mt="2" mb="2" alignSelf="flex-end">
        {email}
      </Heading>
    </VStack>
  );
};

export default memo(Tile);
