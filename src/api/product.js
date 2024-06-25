import axios from "axios";
import ApiPath from "./apiPath";

export const getProductApi = async () => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.get(ApiPath.getAllProducts, config)
        // console.log("Response getProduct :", response?.data?.data);
        return response?.data?.data
    } catch (error) {
        console.log("Get product is Error :", error);
        return false
    }
}

export const searchProductApi = async (search) => {
    try {

        const response = await axios.get(`${ApiPath.searchProduct}`, {
            params: {
                search: search
            }
        })
        return response?.data?.data
    } catch (error) {
        console.log("Search product Error :", error);
    }
}