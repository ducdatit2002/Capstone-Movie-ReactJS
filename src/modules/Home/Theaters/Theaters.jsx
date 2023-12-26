
import React from "react";
import Banner from "./Banner";
import Intro from "./Intro/Intro";
import Showing from "./Showing";
import styles from "./home.module.scss";
import Theaters from "./Theaters/Theaters";

const Home = () => {

  return (
    <div className={styles.wrapHome}>
      <Intro />

      <Banner />

      <Showing />

      <Theaters />
    </div>
  );
};

export default Home;
