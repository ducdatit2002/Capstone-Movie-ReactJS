import fetcher from "./fetcher";

const authAPI = {
  signIn: (values) => {
    return fetcher.post("QuanLyNguoiDung/DangNhap", values);
  },

  signUp: (values) => {
    return fetcher.post("QuanLyNguoiDung/DangKy", {
      ...values,
      MaNhom: "GP07",
    });
  },
};

export default authAPI;
