import React, { useEffect, useState } from 'react';
import useStore from '../../components/store';
import { IoIosArrowBack } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import formatNumber from '../../components/formatNumber';
import { Link } from 'react-router-dom';
import { getOrderDetailJoinAPI } from '../../api/order';

export const HistoryAwait = () => {
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
            setOrderJoinData(response.data)
            // console.log(response.);
        }
        fetchData()
        // .map((items) => console.log(items.OID))

    }, [])
    console.log(orderJoinData);
    return (
        <div className='w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-sm mx-auto justify-center'>
                    <Link to={`/${id}`} className='absolute left-0 text-[24px]'>
                        <IoIosArrowBack
                        />
                    </Link>
                    <h2 className='text-[20px] font-semibold'>ກຳລັງດຳເນີນການ</h2>
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
                                    <td className='text-center py-5 font-medium'>{item.OID}</td>
                                    <td className='py-1'>
                                        <img src={item.image} alt=""
                                            className='w-16 h-16 object-cover rounded-md'
                                        />
                                    </td>
                                    <td className='text-center py-5 px-2 font-medium'>{item.name}</td>
                                    <td className='text-center py-5 px-2 font-medium'>{item.total}</td>
                                    <td className='text-center py-5 px-2 font-medium'>
                                        <div className='flex w-full justify-center gap-1 items-center'>
                                            <span>{item.qty}</span>
                                        </div>
                                    </td>
                                    <td className='text-center py-5 px-2 font-medium'>
                                        {formatNumber(item.total * item.qty)}
                                    </td>
                                    <td className='text-center py-5 px-2'>
                                        {id}
                                    </td>
                                    <td className='text-center py-5 px-2'>
                                        <div className={`flex items-center gap-2  font-semibold ${item.status == "ສຳເລັດ" ? "text-green-500" : "text-orange-200"}`}>
                                            <span>{item.status}</span> {item.status == "ສຳເລັດ" ? <FaCheckCircle /> : <RiLoader2Fill />}
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
