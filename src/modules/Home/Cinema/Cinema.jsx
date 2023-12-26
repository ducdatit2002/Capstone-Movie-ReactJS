import React, { useState, useEffect } from "react";
import { Tabs } from "@mantine/core";
import theaterAPI from "../../../services/theaterAPI";

import styles from './Cinema.module.scss';



const Cinema = () => {
  const [theaters, setTheater] = useState([]);
  const [indexTheater, setIndexTheater] = useState(0);
  const [indexDetailTheater, setIndexDetailTheater] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await theaterAPI.getTheaterSchedule();
        setTheater(data);
      } catch (error) {
        console.log(error);
      }
    })();
    console.log("useEffect-Re");
  }, []);

  const selectedTheater = (index) => {
    setIndexTheater(index);
    setIndexDetailTheater(0);
  };

  const selectedDetailTheater = (index) => {
    setIndexDetailTheater(index);
  };

  if (theaters.length === 0) return;
  return (
    <div className={styles.wrapTheater}>
      <div className="container text-light">
        <div className={styles.theaters} >
          <Tabs defaultValue={theaters[indexTheater].maHeThongRap}>
            <Tabs.List position="center">
              {theaters.map((item, index) => (
                <Tabs.Tab
                  sx={{ color: "red"}}
                  value={item.maHeThongRap}
                  key={item.maHeThongRap}
                  onClick={() => selectedTheater(index)}
                >
                  <img
                    src={item.logo}
                    alt={item.tenHeThongRap}
                    width="60px"
                    height="60px"
                  />
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value={theaters[indexTheater].maHeThongRap} pt="xs">
              <Tabs
                defaultValue={
                  theaters[indexTheater].lstCumRap[indexDetailTheater].maCumRap
                }
                orientation="vertical"
                classNames={
                  {
                    // root: styles.tabsDetailTheater,
                    // tabsList: styles.tabsListDetailTheater,
                  }
                }
              >
                <Tabs.List>
                  {theaters[indexTheater].lstCumRap.map((item, index) => (
                    <Tabs.Tab
                      value={item.maCumRap}
                      key={item.maCumRap}
                      onClick={() => selectedDetailTheater(index)}
                    >
                      <div className={styles.detailTheater} >
                        <h6>{item.tenCumRap}</h6>
                        <p>{item.diaChi}</p>
                      </div>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                <Tabs.Panel
                  value={
                    theaters[indexTheater].lstCumRap[indexDetailTheater]
                      .maCumRap
                  }
                >
                  {theaters[indexTheater].lstCumRap[
                    indexDetailTheater
                  ].danhSachPhim.map((item, index) => (
                    <div className={styles.movieTheater}>
                      <div className="row">
                        <div className="col-4">
                          <img src={item.hinhAnh} alt={item.tenPhim} />
                        </div>
                        <div className="col-8">
                          <h6 key={item.maPhim}>{item.tenPhim}</h6>
                          <div className="row">
                            {item.lstLichChieuTheoPhim.map((i) => (
                              <div className="col">{i.ngayChieuGioChieu}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Cinema;
