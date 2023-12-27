import React from "react";
import styles from "./overView.module.scss";
import { Button } from "@mantine/core";
import { openModal } from "../../../slices/modalMovie";
import { useDispatch } from "react-redux";
import cn from "classnames";

const OverView = ({ movie }) => {
  const dispatch = useDispatch();
  const time = new Date();

  // `${time.getDate(movie.ngayKhoiChieu)}-${time.getMonth(movie.ngayKhoiChieu)}-${time.getFullYear(movie.ngayKhoiChieu)}`

  if (!movie) return;

  return (
    <div className={styles.OverView}>
      <div className="container">
        <div className={cn("row", styles.OverViewContent)}>
          {/* <div className="row OverViewContent"> */}
          <div className="col-4">
            <div className={styles.ImgMovie}>
              <img src={movie.hinhAnh} alt="" />
            </div>
          </div>
          <div className="col-7">
            <div className="DetailMovie">
              <h1>{movie.tenPhim}</h1>
              <p>{movie.moTa}</p>
              <p>Đánh giá: {movie.danhGia} / 10</p>
              <p>
                Ngày khởi chiếu:{" "}
                {`${time.getDate(movie.ngayKhoiChieu)}-${time.getMonth(
                  movie.ngayKhoiChieu
                )}-${time.getFullYear(movie.ngayKhoiChieu)}`}
              </p>
              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                radius="md"
                size="lg"
                styles={{ root: { marginRight: "20px", marginBottom: "20px" } }}
                onClick={() => dispatch(openModal(movie))}
              >
                Xem trailer
              </Button>

              <a href={"#showTime"}>
                <Button
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  radius="md"
                  size="lg"
                  href={"#showTime"}
                >
                  Mua vé ngay
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;