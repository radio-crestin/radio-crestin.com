import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";

export default function InstallMobileAppButton() {
  return (
    <div className={`${styles.mobileAppButtonContainer}`}>
      <p className={`${styles.mobileAppDescription}`}>
        Te invităm să instalezi aplicația mobilă Radio Creștin.
      </p>
      <div className={`${styles.mobileAppLinkApps}`}>
        <a
          href="https://play.google.com/store/apps/details?id=com.radiocrestin.radio_crestin&pcampaignid=web_share&ref=website"
          target="_blank"
          className={`${styles.mobileAppButton}`}
        >
          <Image src="/images/google-play-badge.svg"
                 width={160}
                 height={60}
               alt="Instaleaza aplicatia RadioCrestin pe Android."
               className={`${styles.mobileAppButtonGooglePlay}`} />
        </a>

        <a
          href="https://apps.apple.com/ro/app/radio-crestin/id6451270471?l=ro&ref=website"
          target="_blank"
          className={`${styles.mobileAppButton}`}
        >
          <Image src="/images/app-store-badge.svg"
                 width={160}
                 height={60}
               alt="Instaleaza aplicatia RadioCrestin pe iOS."
               className={`${styles.mobileAppButtonGooglePlay}`} />

        </a>
      </div>

    </div>
  )
}
