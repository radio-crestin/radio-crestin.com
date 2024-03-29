import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import styles from './DownloadAppBanner.module.scss';

export default function DownloadAppBanner() {
  return (
    <Box
      mt={150}
      mb={20}
      pt={{base: 50, md: 100}}
      display={'flex'}
      flexDirection={{base: 'column', md: 'row'}}
      background={'#c6eaff'}
      position={'relative'}
      justifyContent={'space-between'}>
      <Box
        minW={{md: '390px', lg: '625px'}}
        paddingLeft={{base: '20px', md: '60px'}}
        paddingRight={{ base: '20px', md: '0' }}
        paddingBottom={20}>
        <Text fontSize={32} fontWeight={700} letterSpacing={0.7}>
          Descarcă aplicația Radio Creștin
        </Text>
        <Text fontSize={15}>
          Toate posturile tale preferate într-un singur loc, gratis și fără
          reclame.
        </Text>
        <Box mt={5} display={'flex'} gap={2} alignItems={'center'} w={'100%'}
          maxWidth={450}>
          <Box width={'33%'}>
            <Link href="https://apps.apple.com/app/6451270471"
              target={"_blank"}>
            <Image
              src={'/images/appstore.svg'}
              width={150}
              height={54}
              alt={'AppStore Image Radio Crestin'}
            />
          </Link>
          </Box>
          <Box width={'33%'}>
          <Link
            href="https://play.google.com/store/apps/details?id=com.radiocrestin.radio_crestin&hl=en_US"
            style={{ position: 'relative' }} target={"_blank"}>
            <Image
              src={'/images/playstore.svg'}
              width={150}
              height={53}
              alt={'PlayStore Image Radio Crestin'}
            />
          </Link>
          </Box>
          <Box width={'33%'}>
            <Link
              href="https://appgallery.huawei.com/app/C109055331"
              style={{ position: 'relative' }} target={"_blank"}>
              <Image
                src={'/images/appgallery.svg'}
                width={150}
                height={53}
                alt={'PlayStore Image Radio Crestin'}
              />
          </Link>
        </Box>
        </Box>
      </Box>
      <Box
        position={'relative'}
        width={{base: '100%', lg: '500px'}}
        marginRight={{base: 0, lg: 90, xl: 150}}>
        <Image
          className={styles.image_iphone13}
          width={500}
          height={500}
          src={'https://radio-crestin.s3.eu-central-1.amazonaws.com/media/public/iphone_desktop_size.png'}
          alt={'iPhone 13 Radio Crestin'}
        />
        <Image
          className={styles.image_iphone13_mobile}
          width={400}
          height={400}
          src={'https://radio-crestin.s3.eu-central-1.amazonaws.com/media/public/iphone_mob_size.png'}
          alt={'iPhone 13 Radio Crestin'}
        />
      </Box>
      <Image
        className={styles.image_qr_code}
        width={90}
        height={90}
        src={'/images/qr-code.png'}
        alt={'QR Code Radio Crestin'}
      />
    </Box>
  );
}
