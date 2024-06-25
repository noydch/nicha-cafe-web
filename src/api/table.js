import axios from "axios";
import ApiPath from "./apiPath";


export const getTableAll = async () => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await axios.get(ApiPath.getAllTables, config)
        console.log("Get table = ", response?.data?.data);
        return response?.data?.data
    } catch (error) {
        console.log("Somthing wrong in get table :", error);
        return false
    }
}

// export const getTableOne = async (TID) => {
//     try {
//         const config = {
//             headers: {
//                 "Content-type": "application/json"
//             }
//         }
//         const response = await axios.get(`${ApiPath.getOneTable}/${2}`, config)
//         console.log("Get table = ", response?.data?.data);
//         return response?.data?.data
//     } catch (error) {
//         console.log("Somthing wrong in get table :", error);
//         return false
//     }
// }

