import React from "react";
import styles from "./movieItem.module.scss";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../slices/modalMovie";

const MovieItem = ({ currentItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(window.innerWidth)

  return (
    <div className="row">
      {currentItems.map((item) => (
        <div
          className="col-6 col-md-4 col-lg-3"
          key={item.maPhim}
          //  onClick={() =>navigate(`/movie/${item.maPhim}`)}
        >
          <div className={styles.movieItem}>
            <img
              className={styles.hinhAnh}
              src={item.hinhAnh}
              alt={item.tenPhim}
            />
            <div className={styles.heading}>{item.tenPhim}</div>

            {/* Overlay */}
            <div className={styles.overlay}>
              <div className={styles.icon} onClick={() => dispatch(openModal(item))}>
                <FaPlay />
              </div>
              <div className={styles.button}>
                <Button
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  radius="md"
                  // size={window.innerWidth <= 600 ? "md" : "lg"}
                  // size="lg"
                  onClick={() => navigate(`/movie/${item.maPhim}`)}
                  classNames={{root : styles.btnMovieItem}}
                >
                  Chi Tiết
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieItem;
