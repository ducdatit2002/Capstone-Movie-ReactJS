import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Checkbox} from "@mantine/core";
import { signIn } from "../../../slices/authSlice";
import swal from 'sweetalert';
import styles from "./SignIn.module.scss";

const SignIn = () => {
  const { user, loading, error } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const [searchParams, setSearchParam] = useSearchParams();


  const { register, handleSubmit, formState } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched",
  });

  const onSubmit = (value) => {
    dispatch(signIn(value));
  };
  
  const { errors } = formState;
  
  if (user) {
    swal("Đăng nhập thành công", "" , "success" );
    const redirectUrl = searchParams.get("redirectURL");
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <div className={styles.iconSignIn}>
          <MdAccountCircle />
        </div>

        <h1>Đăng nhập</h1>

        <form className={styles.formSignIn} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputSignIn}>
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Tài khoản"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống!",
                },
              })}
            />
            {errors.taiKhoan && (
              <p className={styles.txtError}>{errors.taiKhoan.message}</p>
            )}
          </div>

          <div className={styles.inputSignIn}>
            <label>Mặt khẩu</label>
            <input
              type="text"
              placeholder="Mật khẩu"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
              })}
            />
            {errors.matKhau && (
              <p className={styles.txtError}>{errors.matKhau.message}</p>
            )}
          </div>

          <div className="text-start my-3">
            <Checkbox label="Nhớ tài khoản" color="orange" />
          </div>

          {error && <p className={styles.txtError}>{error}</p>}
          <div className={styles.btnSignIn}>
            <button disabled={loading}>Đăng nhặp</button>
          </div>
        </form>
        <div className={styles.linkSignUp}>
          <p>
            Chưa có tài khoản
            <span>
              <Link to="/SignUp">Đăng kí ngay </Link>
            </span>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;