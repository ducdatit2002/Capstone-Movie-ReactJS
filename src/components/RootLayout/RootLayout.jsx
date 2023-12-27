import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import ReactPlayer from "react-player";
import { onCloseModal } from "../../slices/modalMovie";
import { Modal } from "@mantine/core";
import styles from "./rootLayout.module.scss";
import Footer from "../Footer/Footer";

const RootLayout = () => {
  const { isOpen, movie } = useSelector((state) => state.modalMovie);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapRoot}>
      <Header />

      <Outlet />

      <Modal
        opened={isOpen}
        onClose={() => dispatch(onCloseModal())}
        withCloseButton={false}
        padding="none"
        size="75%"
        centered={true}
      >
        <div className={styles.playerWrap} style={{paddingTop:"50%"}}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={movie ? movie.trailer : null}
            className={styles.videoModal}
          />
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default RootLayout;
