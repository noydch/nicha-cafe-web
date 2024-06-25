import axios from "axios";
import ApiPath from "./apiPath";


// export const addOrder = async (data) => {
//     // const token = localStorage.getItem("token");
//     const headerConfig = {
//         headers: {
//             "Content-Type": "multipart/form-data",
//             // "Authorization": `Bearer ${token}`
//         }
//     }

//     const formData = new FormData();
//     formData.append("tables_id", data?.table_id || "");
//     formData.append("totalPrice", data?.totalPrice || "");
//     formData.append("file", data?.file || "");

//     try {
//         const response = await axios.post(ApiPath.addOrder, formData, headerConfig);
//         console.log("res of AddProductApi =>> ");
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.log("error occured in AddProductApi ==> ", error);
//         return false;
//     }
// };


export const addOrderTableNo = async (data) => {
    // const token = localStorage.getItem("token");
    const headerConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization": `Bearer ${token}`
        }
    }

    const formData = new FormData();
    formData.append("noTable", data?.noTable || "");
    formData.append("totalPrice", data?.totalPrice || "");
    formData.append("billQR", data?.file || "");

    try {
        const response = await axios.post(ApiPath.addOrderTableNo, formData, headerConfig);
        console.log("res of AddProductApi =>> ");
        console.log(response);
        return response

    } catch (error) {
        console.log("error occured in AddProductApi ==> ", error);
        return false;
    }
};

export const getOrder = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await axios.get(ApiPath.getAllOrders, config)
        console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        console.log("Get order error:", error);
    }
}