import { useMemo } from "react";

import { FLAG } from "Utilities/analytics/optimizely/constants";

import { useBinaryExperiment } from "../useBinaryExperiment";

import styles from "./useHomeHeroImage.scss";

const flag = FLAG.SWA_HOME_HERO_IMAGE;
const keys = ["off", "floating", "minimal_mobile"] as const;

export const useHomeHeroImage = (isLoggedIn: boolean = false) => {
  const shouldRunExperiment = !isLoggedIn;

  const isInFloatingCarBucket = useBinaryExperiment(flag, {
    onKey: keys[1],
    triggerExperiment: shouldRunExperiment,
  });
  const showFloatingCar = isInFloatingCarBucket && shouldRunExperiment;

  const isInMinimalMobileBucket = useBinaryExperiment(flag, {
    onKey: keys[2],
    triggerExperiment: false,
  });
  const hideMobileHeroImage = isInMinimalMobileBucket && shouldRunExperiment;

  const experimentWrapperStyles = {
    [styles.heroExperimentWrapper]: true,
    [styles.hasFloatingCar]: showFloatingCar,
    [styles.hideMobileHeroImage]: hideMobileHeroImage,
  };

  const floatingCarElement = useMemo(
    () => (
      <figure className={styles.floatingCar}>
        <span className={styles.frame1}></span>
        <span className={styles.frame2}></span>
        <span className={styles.frame3}></span>
        <span className={styles.frame4}></span>
      </figure>
    ),
    []
  );

  return { experimentWrapperStyles, floatingCarElement, showFloatingCar };
};
