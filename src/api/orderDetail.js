import axios from "axios"
import ApiPath from "./apiPath"


export const addOrderDetail = async (data) => {
    try {
        const config = {
            headers: {
                "Content": "application/json"
            }
        }
        const response = await axios.post(ApiPath.addOrderDetail, data, config)
        console.log(response?.data?.data);
        return response?.data?.data
    } catch (error) {
        console.log("Order Detail is Error ==>", error);
    }
}