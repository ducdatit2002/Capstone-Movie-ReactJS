import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import theaterAPI from "../../../services/theaterAPI";
import cn from "classnames";
import styles from "./ShowTime.module.scss";
import { useNavigate } from "react-router-dom";

const ShowTime = ({ movieID }) => {
  const navigate = useNavigate();
  const [theatersSystem, setTheatersSystem] = useState();
  const [maRap, setMaRap] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await theaterAPI.getMovieSchedule(movieID);
      setTheatersSystem(data.heThongRapChieu);
      setMaRap(data.heThongRapChieu[0].maHeThongRap);
    })();
  }, [movieID]);

  const selectedMaRap = (maRap, index) => {
    setMaRap(maRap);
    setIndex(index);
  };

  if (!theatersSystem) return;

  return (
    <div className={styles.showTime} id="showTime">
      <div className={cn("container", styles.wrapShowTime)}>
        <Tabs defaultValue={maRap}>
          <Tabs.List position="center">
            {theatersSystem.map((item, index) => (
              <Tabs.Tab
                value={item.maHeThongRap}
                key={item.maHeThongRap}
                onClick={() => selectedMaRap(item.maHeThongRap, index)}
              >
                <img
                  src={item.logo}
                  alt={item.tenHeThongRap}
                  className={styles.hinhAnhRap}
                  // width="70px"
                  // height="70px"
                />
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value={maRap}>
            {theatersSystem[index].cumRapChieu.map((item) => (
              <div
                key={item.maCumRap}
                className={cn("row ", styles.cumRapChieu)}
              >
                <div className="col-4">
                  <div className={styles.InfoTheater}>
                    <h4>{item.tenCumRap}</h4>
                    <p>{item.diaChi}</p>
                  </div>
                </div>

                <div className="col-8">
                  <div className={cn("row", styles.lichChieuRap)}>
                    {item.lichChieuPhim.map((i) => (
                      <div
                        key={i.maLichChieu}
                        className="col-4 col-lg-3"
                        onClick={() =>
                          navigate(`/bookingMovie/${i.maLichChieu}`)
                        }
                      >
                        <p className={styles.lichChieuPhim}>
                          {i.ngayChieuGioChieu}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ShowTime;