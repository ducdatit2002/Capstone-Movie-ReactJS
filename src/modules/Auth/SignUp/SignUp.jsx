import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import authAPI from "../../../services/authAPI";

import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [successRegister, seSuccessRegister] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      nhapLaiMK: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (value) => {
    const {nhapLaiMK: _, ...payload} = value;
    try {
      await authAPI.signUp(payload);
      seSuccessRegister(true);
      swal("Đăng kí thành công", "", "success");

    } catch (error) {
      swal("Đăng kí thất bại", "", "error");
      console.log(error)
    }
  };

  if(successRegister){
    return <Navigate to="/signIn" replace />
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpContent}>
        <div className={styles.iconSignUp}>
          <AiOutlineUsergroupAdd />
        </div>

        <h1>Đăng kí</h1>

        <form className={styles.formSignUp} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputSignUp}>
            <label>Tài khoản</label>
            <input
              type="text"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống!",
                },
                minLength: {
                  value: 5,
                  message: "Tài khoản phải từ 5 - 20 kí tự",
                },
                maxLength: {
                  value: 20,
                  message: "Tài khoản phải từ 5 - 20 kí tự",
                },
              })}
            />
            {errors.taiKhoan && (
              <p className={styles.txtError}>{errors.taiKhoan.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Mật khẩu</label>
            <input
              type="text"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống!",
                },
                minLength: {
                  value: 5,
                  message: "Mật khẩu phải từ 5 - 20 kí tự",
                },
                maxLength: {
                  value: 20,
                  message: "Mật khẩu phải từ 5 - 20 kí tự",
                },
              })}
            />
            {errors.matKhau && (
              <p className={styles.txtError}>{errors.matKhau.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Nhập lại mật khẩu</label>
            <input
              type="text"
              {...register("nhapLaiMK", {
                required: {
                  value: true,
                  message: "Nhập lại mật khẩu không được để trống!",
                },
                validate: (val) => val === watch("matKhau") || "Mật khẩu không trùng khớp",
                })}
            />
            {errors.nhapLaiMK && (
              <p className={styles.txtError}>{errors.nhapLaiMK.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống!",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                  message: "Email phải đúng định dạng",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Số điện thoại</label>
            <input
              type="text"
              {...register("soDt", {
                required: {
                  value: true,
                  message: "Số điện thoại không được để trống!",
                },
              })}
            />
            {errors.soDt && (
              <p className={styles.txtError}>{errors.soDt.message}</p>
            )}
          </div>
          <div className={styles.inputSignUp}>
            <label>Họ tên</label>
            <input
              type="text"
              {...register("hoTen", {
                required: {
                  value: true,
                  message: "Họ tên không được để trống!",
                },
              })}
            />
            {errors.hoTen && (
              <p className={styles.txtError}>{errors.hoTen.message}</p>
            )}
          </div>

          <div className={styles.btnSignUp}>
            <button>Đăng kí</button>
          </div>
        </form>
        <div className={styles.linkSignUp}>
          <p>
            Đã có tài khoản 
            <span>
              <Link to="/SignIn">Đăng nhập ngay</Link>
            </span>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;