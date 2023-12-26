import { useState, useEffect } from "react";
import movieAPI from "../../../services/movieAPI";
import { Carousel } from "@mantine/carousel";

import styles from "./banner.module.scss";

const Banner = () => {
  const [banners, setBanners] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getBanner();
        setBanners(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!banners) return;

  return (
    <div className={styles.wrapBanner}>
      <Carousel
        sx={{ maxWidth: "100%", maxHeight: "600px" }}
        mx="auto"
        withIndicators
        // height={500}
        controlSize={40}
        loop
        classNames={{ 
          control: styles.controlBanner,
          container: styles.banner,
        }}
      >
        {banners.map((item) => (
          <Carousel.Slide key={item.maPhim}>
            <img
              src={item.hinhAnh}
              alt={item.mabanner}
              height="100%"
              width="100%"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
