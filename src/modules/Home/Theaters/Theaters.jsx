import React, { useEffect, useState } from "react";
import theaterAPI from "../../../services/theaterAPI";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from '@mantine/core';
import cn from "classnames";
import styles from "./Theaters.module.scss";

const Theaters = () => {
  const [theaters, setTheater] = useState([]);
  const [indexTheater, setIndexTheater] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await theaterAPI.getTheaterSchedule();
        setTheater(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const selectedTheater = (index) => {
    setIndexTheater(index);
  };

  if (theaters.length === 0) return;

  return (
    <div className={styles.wrapTheaters} id="theaters">
      <div className={styles.containerTheater}>
        <div className={styles.Theaters}>
          <Tabs>
            {/* LOGO */}
            <TabList className={styles.allLogoTheaters}>
              {theaters.map((item, index) => (
                <Tab
                  sx={{ color: "red" }}
                  value={item.maHeThongRap}
                  key={item.maHeThongRap}
                  onClick={() => selectedTheater(index)}
                  className={styles.logoTheater}
                >
                  <img
                    src={item.logo}
                    alt={item.tenHeThongRap}
                    width="100%"
                    height="100%"
                  />
                </Tab>
              ))}
            </TabList>

                {/* Content detail theater */}
            <div className={styles.wrapDetailTheater}>
              {theaters.map((item) => (
                <TabPanel key={item.maHeThongRap}>
                  <Tabs>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <TabList>
                          {item.lstCumRap.map((i) => (
                            <Tab key={i.maCumRap}>
                              <div className={styles.detailTheater}>
                                <h6>{i.tenCumRap}</h6>
                                <p>{i.diaChi}</p>
                              </div>
                            </Tab>
                          ))}
                        </TabList>
                      </div>
                      <div className="col-12 col-md-8">
                      <ScrollArea style={{ height: 800 }} type="scroll">
                        <div className={styles.wrapMovie}>
                        {theaters[indexTheater].lstCumRap.map((item) => (
                          <TabPanel key={item.maCumRap}>
                            {item.danhSachPhim.map((i) => (
                              <div className={styles.listMovie} key={i.maPhim}>
                                <div className="row">
                                  <div className=" col-12 col-sm-4 col-lg-3">
                                    <div className={styles.imgMovie}>
                                      <img src={i.hinhAnh} alt={i.tenPhim} />
                                      <h4 >
                                        {i.tenPhim}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-8 col-lg-9">
                                    <div className="row">
                                      {i.lstLichChieuTheoPhim.map((a) => (
                                        <div
                                          className={cn(
                                            "col-4 col-lg-3",
                                            styles.schedule
                                          )}
                                          key={a.maLichChieu}
                                          onClick={() =>
                                            navigate(
                                              `bookingMovie/${a.maLichChieu}`
                                            )
                                          }
                                        >
                                          <p>{a.ngayChieuGioChieu}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </TabPanel>
                        ))}
                        </div>
                      </ScrollArea>
                      </div>
                    </div>
                  </Tabs>
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Theaters;
