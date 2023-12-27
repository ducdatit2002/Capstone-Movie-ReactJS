import fetcher from "./fetcher";

const bookingMovieAPI = {
    getListBooking : (maLichChieu) => {
        return fetcher.get("QuanLyDatVe/LayDanhSachPhongVe", {
            params: {
                MaLichChieu: maLichChieu,
            }
        })
    },

    postBookingTicket : (DanhSachVe) => {
        return fetcher.post("QuanLyDatVe/DatVe", DanhSachVe)
    }   
}

export default bookingMovieAPI;