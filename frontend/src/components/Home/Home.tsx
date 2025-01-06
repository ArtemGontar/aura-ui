import React from "react";
import styles from "./Home.module.css";
import Horoscope from "../Cards/Horoscope/Horoscope";
import Psychological from "../Cards/Psychological/Psychological";
import Astrology from "../Cards/Astrology/Astrology";
import MagicBall from "../Cards/MagicBall/MagicBall";
import Tarot from "../Cards/Tarot/Tarot";
import Runes from "../Cards/Runes/Runes";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>Welcome Back!</h1>
      <p className={styles.subtitle}>We hope you have a magical day!</p>
      <div className={styles.cards}>
        <Horoscope />
        <Psychological />
        <Astrology />
        <MagicBall />
        <Tarot />
        <Runes />
      </div>
    </div>
  );
};

export default Home;
