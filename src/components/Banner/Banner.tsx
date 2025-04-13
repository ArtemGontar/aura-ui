import React from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  headerText: string;
  subText: string;
  bgColor: string;
  icon: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ headerText, subText, bgColor, icon }) => {
  return (
    <div className={`${styles.banner} ${bgColor}`}>
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className={styles.bannerText}>{headerText}</h2>
      <p className={styles.subText}>{subText}</p>
    </div>
  );
};

export default Banner;
