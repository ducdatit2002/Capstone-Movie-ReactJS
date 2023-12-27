import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useScrollY from "../hooks/useScrollY";
import {  NavLink } from "@mantine/core";
import { MdAccountCircle } from "react-icons/md";
import styles from "./Header.module.scss";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const { scrollY } = useScrollY();

  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapHeader}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Link to="/">Movie</Link>
        </div>
        <nav className={scrollY ? styles.navMovieScroll : styles.navMovie}>
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <a href="#Showing">Danh sách phim</a>
            </li>
            <li>
              <a href="#theaters">Cụm rạp chiếu</a>
            </li>
          </ul>
        </nav>

        <div className={styles.auth}>
          {user 
          ? (
            // <Box sx={{ width: "100%" }}>
            <div>
              <NavLink
              label={user.hoTen}
              icon={<MdAccountCircle size={25} color="success" className=""/>}
              childrenOffset={50}
              classNames={{
                root: styles.navAccount,
                icon: styles.iconAccount,
                label: styles.labelAcount, 
              }}
              >
                <NavLink 
                label={<p>Thoát tài khoản</p>} 
                classNames={{
                  root: styles.navChildren,
                  label: styles.labelChildren,
                }}
                onClick={() => dispatch(logout())} 
                />
              </NavLink>
            </div>
            // </Box>
          ) 
          : (
          <div>
            <Link to="/signIn">Đăng nhập</Link>
            <span>|</span>
            <Link to="/signUp">Đăng kí</Link>
          </div>
          )
          }
          {/* <div>
            <Link to="/signIn">Đăng nhập</Link>
            <span>|</span>
            <Link to="/signUp">Đăng kí</Link>
          </div> */}
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
