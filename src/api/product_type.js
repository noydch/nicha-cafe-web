import axios from "axios";
import ApiPath from "./apiPath";


export const getProductTypeApi = async () => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await axios.get(ApiPath.getAllProductTypes, config)
        // console.log("Response product type:", response?.data?.data);
        return response?.data?.data
    } catch (error) {
        console.log("get product type :", error);
    }
}