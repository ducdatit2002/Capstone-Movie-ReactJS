import React from "react";
import cn from "classnames";
import { useEffect } from "react";
import theaterAPI from "../../services/theaterAPI";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await theaterAPI.getTheaterSystem();
      setTheaters(data);
    })();
  }, []);

  return (
    <>
      <footer>
        <div className="container pt-4">
          <div className={cn("mb-5", styles.footerTop)}>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className={styles.footerFirst}>
                  <h2 className={styles.title}>
                    <Link to={"/"}>Movie</Link>
                  </h2>
                  <p>
                    Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
                    ultrices in ligula. Semper at tempufddfel. Lorem ipsum dolor
                    sit amet Semper at elit.
                  </p>
                  <div className={styles.footerSocial}>
                    <FaFacebookF />
                    <FaTwitter />
                    <FaInstagram />
                    <FaLinkedinIn />
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mt-5 mt-sm-0">
                <h4>Đối tác liên kết</h4>
                <div className="row">
                  {theaters.map((item) => (
                    <div className="col-3 mb-2" key={item.maHeThongRap}>
                      <img src={item.logo} alt={item.tenCumRap} width="100%" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 mt-5 mt-lg-0">
                <div className={styles.footerSub}>
                  <h4>Theo dõi bản tin của chúng tôi</h4>
                  <p>
                    Nhập email của bạn và nhận tin tức, cập nhật mới nhất và ưu
                    đãi đặc biệt từ chúng tôi.
                  </p>
                  <input type="email" placeholder="Địa chỉ Email của bạn" />
                  <button className="btn">Đăng kí ngay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("container pb-2", styles.footerBot)}>
          <div className="row justify-content-center">
            <div className="col-4 col-sm-3 col-md-2 ">
              <p>Nghề nghiệp</p>
            </div>
            <div className="col-4 col-sm-3 col-md-2 ">
              <p>Chính sách</p>
            </div>
            <div className="col-4 col-sm-3 col-md-2 ">
              <p>Liên hệ</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
