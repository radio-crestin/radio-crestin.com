import { Flex, Button, Image } from "@chakra-ui/react";
import React from "react";

export default function ShareOnSocial({station}: any) {
  if (!station) return null;

  const url = `https://share.radio-crestin.com/${station.slug}`;
  const message = `Ascultă și tu ${station.title}: \n${url}`;
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(message)}`;
  const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Flex direction={"row"} gap={{ base: 3, md: 3 }} my={4} w={'full'} justifyContent={{base: 'space-between', md:'start'}}>
      <Button
        as="a"
        href={facebookShareLink}
        target="_blank"
        colorScheme='facebook'
        borderRadius="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        padding="12px 25px"
        fontSize="0.8rem"
        width={{ base:'50%', md: 'auto'}}
      >
        <Image
          src={'/icons/facebook.svg'}
          mr={3}
          alt={'Trimite pe Facebook'}
        />
        Trimite pe Facebook
      </Button>
      <Button
        as="a"
        href={whatsappShareLink}
        target="_blank"
        colorScheme='whatsapp'
        borderRadius="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        padding="12px 25px"
        fontSize="0.8rem"
        width={{ base:'50%', md: 'auto'}}
      >
        <Image
          src={'/icons/whatsapp.svg'}
          mr={3}
          alt={'Trimite pe Whatsapp'}
        />
        Trimite pe WhatsApp
      </Button>
    </Flex>
  );
}
