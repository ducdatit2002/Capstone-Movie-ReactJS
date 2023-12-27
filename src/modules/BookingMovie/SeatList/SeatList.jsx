import React from "react";
import { Button } from "@mantine/core";
import styles from "./SeatList.module.scss";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addSeat, deleteSeat } from "../../../slices/bookingMovieSlice";

const SeatList = () => {
  const { infoMovie, selectedSeat } = useSelector(
    (state) => state.bookingMovieSlice
  );
  const dispatch = useDispatch();


  const handleSeletedSeat = (seat) => {
    if (seat.daDat) return;
    const index = selectedSeat.findIndex((item) => item.maGhe === seat.maGhe);
    if (index === -1) {
      dispatch(addSeat(seat));
    } else {
      dispatch(deleteSeat(seat));
    }
  };

  const handIsSelecting = (seat) => {
    const index = selectedSeat.findIndex((item) => item.maGhe === seat.maGhe);
    if(index === -1) {
      return false;
    }
    return true;
  }

  return (
    <div className={styles.warpSeatList}>
      <div className={styles.screen}></div>
      <div className={styles.seatList}>
        {infoMovie.danhSachGhe.map((seat) => {
          let isSelecting = handIsSelecting(seat)
          return (
            <Button
            key={seat.maGhe}
            disabled={seat.daDat}
            classNames={{
              root: cn(
                [
                  seat.loaiGhe === "Vip"
                    ? [`${styles.gheVip}`]
                    : [`${styles.btnSeat}`],
                ],
                {
                  [`${styles.gheDuocChon}`]: seat.daDat,
                  [`${styles.gheDangChon}`]: isSelecting,
                }
              ),
            }}
            onClick={() => handleSeletedSeat(seat)}
          >
            {seat.tenGhe}
          </Button>
          )
        })}
      </div>
      <div className={styles.noteSeat}>
        <div className="row">
          <div className="col">
            <div className={cn(styles.btnNote, styles.GheThuong)}></div>
            <div>Ghế thường</div>
          </div>
          <div className="col">
            <div className={cn(styles.btnNote, styles.GheVip)}></div>
            <div>Ghế Vip</div>
          </div>
          <div className="col">
            <div className={cn(styles.btnNote, styles.GheDaDat)}></div>
            <div>Ghế đã đặt</div>
          </div>
          <div className="col">
            <div className={cn(styles.btnNote, styles.GheDangChon)}></div>
            <div>Ghế đang chọn</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatList;