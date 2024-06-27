import React, { useEffect, useState } from 'react';
import useStore from '../../components/store';
import { IoIosArrowBack } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import formatNumber from '../../components/formatNumber';
import { Link } from 'react-router-dom';
import { getOrderDetailJoinAPI } from '../../api/order';

export const HistoryAwait = () => {
    const clearHistory = useStore((state) => state.clearHistory);
    const [orderJoinData, setOrderJoinData] = useState([])

    const id = localStorage.getItem('id')
    if (!id) {
        console.log("not found id");
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await getOrderDetailJoinAPI()
            if (!response) {
                console.log("error");
            }
            setOrderJoinData(response)
            // console.log(response.);
        }
        fetchData()
        // .map((items) => console.log(items.OID))

    }, [])

    const handleClearHistory = () => {
        clearHistory()
        navigator('/')
    }
    // console.log(orderJoinData.map((item) => item.OID));
    return (
        <div className='w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-sm mx-auto justify-center'>
                    <Link to={`/${id}`} className='absolute left-0 text-[24px]'>
                        <IoIosArrowBack
                        />
                    </Link>
                    <h2 className='text-[20px] font-semibold'>ລາຍການສັ່ງຊື້</h2>
                </div>
            </div>
            <div className='h-full mt-2 max-w-sm mx-auto overflow-x-auto p-2'>
                <table className='w-max table-auto shadow-md'>
                    <thead className='text-[15px] bg-[#d5e2bb]'>
                        <tr>
                            <th className='font-medium py-3 px-3'>ລະຫັດອໍເດີ້</th>
                            <th className='font-medium py-3 px-3'>ຮູບສິນຄ້າ</th>
                            <th className='font-medium py-3 px-3'>ຊື່ສິນຄ້າ</th>
                            <th className='font-medium py-3 px-3'>ລາຄາ</th>
                            <th className='font-medium py-3 px-3'>ຈຳນວນ</th>
                            <th className='font-medium py-3 px-3'>ລາຄາລວມ</th>
                            <th className='font-medium py-3 px-3'>ໂຕະ</th>
                            <th className='font-medium py-3 px-3'>ສະຖານະ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderJoinData.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center py-5 font-medium'>{item.data[0].OID}</td>
                                    <td className='py-1'>
                                        <img src={item.data[0].image} alt=""
                                            className='w-16 h-16 object-cover rounded-md'
                                        />
                                    </td>
                                    <td className='text-center py-5 px-2 font-medium'>{item.data[0].name}</td>
                                    <td className='text-center py-5 px-2 font-medium'>{item.data[0].total}</td>
                                    <td className='text-center py-5 px-2 font-medium'>
                                        <div className='flex w-full justify-center gap-1 items-center'>
                                            <span>{item.data[0].qty}</span>
                                        </div>
                                    </td>
                                    <td className='text-center py-5 px-2 font-medium'>
                                        {formatNumber(item.data[0].total * item.data[0].qty)}
                                    </td>
                                    <td className='text-center py-5 px-2'>
                                        {id}
                                    </td>
                                    <td className='text-center py-5 px-2'>
                                        <div className={`flex items-center gap-1  font-semibold ${item.data[0].status == "ສຳເລັດ" ? "text-green-500" : item.data[0].status == "ກຳລັງດຳເນີນ" ? "text-orange-200" : "text-red-400"}`}>
                                            <span>{item.data[0].status}</span> {item.data[0].status == "ສຳເລັດ" ? <FaCheckCircle /> : item.data[0].status == "ກຳລັງດຳເນີນ" ? <RiLoader2Fill /> : <BiBlock />}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
