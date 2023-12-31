import {Button} from "@chakra-ui/react";
import React from "react";

export default function InstallAppButton() {
  return (
    <Button
      w={{base: '45px', lg: '50px'}}
      h={{base: '45px', lg: '50px'}}
      p={'13px'}
      bg={'#72ac40'}
      _hover={{bg: '#7db64d'}}
      borderRadius={'40px'}
    >
      <svg width="50" height="50" fill={'white'}
           focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M17 18H7V6h10v1h2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v1zm3.38-8.38L21 11l.62-1.38L23 9l-1.38-.62L21 7l-.62 1.38L19 9z"></path>
        <path
          d="m16 8-1.25 2.75L12 12l2.75 1.25L16 16l1.25-2.75L20 12l-2.75-1.25zm5 5-.62 1.38L19 15l1.38.62L21 17l.62-1.38L23 15l-1.38-.62z"></path>
      </svg>
    </Button>
  )
}
