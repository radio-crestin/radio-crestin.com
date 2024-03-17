import React, { useState } from 'react';

import FacebookIcon from '@/public/facebook.svg';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { postReviewClientSide } from '../../frontendServices/review';
import ShareOnSocial from "@/components/ShareOnSocial/ShareOnSocial";

export default function StationInformation(props: any) {
  const { station } = props;
  const average = (arr: any[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const StationRating =
    Math.round(
      (average(station?.reviews?.map((i: any) => i.stars) || []) || 0) * 10,
    ) / 10;
  const numberOfListeners = station?.total_listeners
    ? station?.total_listeners + 1
    : null;
  const latestPost = station.feature_latest_post? station.posts[0]: null;
  const toast = useToast();

  const [showErrorStars, setShowErrorStars] = useState(false)
  const [showErrorTextBox, setShowErrorTextBox] = useState(false)
  const [userReviewStars, setUserReviewStars] = useState(0);
  const [userReviewMessage, setUserReviewMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef<HTMLTextAreaElement>(null);

  const submitReviewMessage = async () => {
    if (userReviewStars === 0) {
      setShowErrorStars(true)
    }

    if (userReviewMessage === '') {
      setShowErrorTextBox(true)
    }

    if (userReviewStars === 0 || userReviewMessage === '') {
      return;
    }

    onClose();
    const { done } = await postReviewClientSide({
      user_name: null,
      station_id: station.id,
      stars: userReviewStars,
      message: userReviewMessage,
    });
    if (done) {
      toast({
        title: 'Review-ul a fost încărcat cu success.',
        description: 'Vă mulțumim frumos!',
        status: 'success',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'A apărut o eroare neașteptată.',
        description: 'Vă rugăm să încercați mai târziu!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={'column'} pl={{ base: 0, lg: 4 }}>
      <Text
        as="h1"
        fontSize={{ base: '2xl', lg: '5xl' }}
        mt={{ base: 1, lg: 0 }}
        noOfLines={1}
        fontWeight="bold">
        {station.title}
      </Text>

      <Flex>
        <ReactStars
          key={`rating-${station.id}`}
          count={5}
          size={20}
          value={StationRating}
          activeColor="#fe7f38"
          edit={false}
          isHalf={true}
        />

        <Text
          onClick={() => {
            setShowErrorTextBox(false);
            setShowErrorStars(false);
            setUserReviewStars(0);
            setUserReviewMessage('');
            onOpen();
          }}
          fontSize={'md'} lineHeight={'28px'} ml={1} borderBottom={"2px dotted #666;"} cursor={"pointer"}>
          {StationRating} ({station?.reviews.length} {station?.reviews.length === 1 ? 'recenzie' : 'recenzii'})
        </Text>

        {station.facebook_page_id && (
          <Link
            href={'https://facebook.com/' + station.facebook_page_id}
            isExternal>
            <Image
              src={FacebookIcon.src}
              alt={'Facebook page'}
              height={22}
              width={22}
              htmlHeight={22}
              htmlWidth={22}
              m={'4px'}
              ml={1.5}
              draggable={false}
            />
          </Link>
        )}
      </Flex>

      {numberOfListeners && (
        <Text fontSize={{ base: 'sm', lg: 'md' }}>
          {numberOfListeners} persoane ascultă împreună cu tine acest radio
        </Text>
      )}

      <>
      {latestPost  && (
        <Text
          as="h2"
          fontSize={{ base: 'md', lg: 'xl' }}
          mt={{ base: 4, lg: 6 }}
          maxW={{ base: '100%', lg: '80%' }}
          noOfLines={1}
          fontWeight="bold">
          {latestPost.title}
        </Text>
      )}
        <Text
          fontSize={{ base: 'md', lg: 'xl' }}
          mt="1"
          noOfLines={{ base: 5, lg: 3 }}
          maxW={{ base: '100%', lg: '90%' }}>
          {latestPost ? latestPost.description : station.description}
        </Text>
        <Link
          href={latestPost ? latestPost.link : station.description_link || station.website}
          mt={{ base: 2, lg: 3 }}
          fontSize={'md'}
          isExternal>
          {latestPost && latestPost.link
            ? 'Continuă citirea articolului'
            : (station.description_link? station.description_action_title : 'Vizitează site-ul web')}{' '}
          <ExternalLinkIcon mx="2px" width={4} height={4} />
        </Link>


        <Box display={{base: "none", md:"block"}} mt={3}>
          <ShareOnSocial station={station} />
        </Box>
      </>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        preserveScrollBarGap={true}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acorda o nota statiei</ModalHeader>
          <Box display={"flex"} px={5}>
            <ReactStars
              key={`rating-editable-${station.id}`}
              onChange={(rating: number) => {
                setUserReviewStars(rating);

                if (rating !== 0) {
                  setShowErrorStars(false)
                }
              }}
              count={5}
              size={40}
              value={userReviewStars}
              activeColor="#fe7f38"
              edit={true}
              half={false}
            />
            <Text display={"flex"} alignItems={"center"} fontWeight={"bold"} pl={3}>
              {userReviewStars === 1 && 'Nu recomand'}
              {userReviewStars === 2 && 'Slab'}
              {userReviewStars === 3 && 'Acceptabil'}
              {userReviewStars === 4 && 'Bun'}
              {userReviewStars === 5 && 'Excelent'}
            </Text>
          </Box>
          {showErrorStars &&
            <Text color={"#be2007"} px={5}>
              *Pe o scară de la 1 la 5, cât de mult ți-a plăcut <b>{station.title}</b>?
            </Text>
          }
          <ModalCloseButton />
          <ModalBody pb={2} pt={5}>
            <FormControl>
              <FormLabel>Mesajul dumneavoastră*</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Introduceți mesajul dumneavoastră aici..."
                onChange={e => {
                  setUserReviewMessage(e.target.value);

                  if (e.target.value !== '') {
                    setShowErrorTextBox(false)
                  }
                }}
                size="sm"
                resize={'none'}
              />
            </FormControl>
          </ModalBody>
          {showErrorTextBox &&
            <Text color={"#be2007"} px={5}>
              *Adaugă și un mesaj pentru a-ți spune părerea
              despre <b>{station.title}</b>.
            </Text>
          }

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitReviewMessage}>
              Trimite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
