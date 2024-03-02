// by Rana
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://rentify-server-drab.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;