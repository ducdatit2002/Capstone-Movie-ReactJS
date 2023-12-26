import React, { useState } from "react";
import ReactPlayer from "react-player";
import { VscMute, VscUnmute } from "react-icons/vsc";
import styles from "./Intro.module.scss";

const Intro = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className={styles.Intro}>
      <ReactPlayer
        playing={true}
        loop={true}
        controls={false}
        width="100%"
        height="100%"
        volume={1}
        muted={isMuted}
        url="https://youtu.be/Ac5PuRpFeRU"
        className={styles.videoIntro}
      />

      <div className={styles.infoIntro}>
        <h1 className={styles.headingIntro}>
          Welcome to
          <br />
          BC54 MOVIE
          <br />
          Đức Đạt & Ngọc Nhân
        </h1>
      </div>
      {isMuted ? (
        <VscMute
          className={styles.iconMute}
          onClick={() => setIsMuted((state) => !state)}
        />
      ) : (
        <VscUnmute
          className={styles.iconMute}
          onClick={() => setIsMuted((state) => !state)}
        />
      )}
      <div className={styles.fadeBottom}></div>
    </div>
  );
};

export default Intro;
