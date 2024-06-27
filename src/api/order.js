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
        return response.data.data

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
        // console.log(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        console.log("Get order error:", error);
    }
}
export const getOrderDetailJoinAPI = async () => {
    try {
        let oidArray = [];
        const storedOidArray = localStorage.getItem('oidArray');

        if (storedOidArray) {
            try {
                oidArray = JSON.parse(storedOidArray);
            } catch (parseError) {
                console.error("Error parsing oidArray from localStorage:", parseError);
                // If parsing fails, assume it's an empty array
                oidArray = [];
            }
        }

        if (oidArray.length === 0) {
            console.log("ไม่มี OID ที่บันทึกไว้");
            return [];
        }

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // สร้าง array ของ promises สำหรับทุก OID
        const promises = oidArray.map(oid =>
            axios.get(`${ApiPath.getOneJoinDetail}/${oid}`, config)
        );

        // รอให้ทุก request เสร็จสิ้น
        const responses = await Promise.all(promises);

        // รวมข้อมูลจากทุก response
        const allData = responses.map(response => response.data);

        console.log("ข้อมูลที่ได้รับจาก API:", allData);
        return allData;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล order detail:", error);
        throw error;
    }
}