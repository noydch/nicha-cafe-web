import React, { useEffect, useState } from 'react';
import useStore from '../../components/store';
import { IoIosArrowBack } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import formatNumber from '../../components/formatNumber';
import { Link } from 'react-router-dom';
import { getOrder, getOrderDetailJoinAPI } from '../../api/order';

export const OrderCancel = () => {
    const [orderJoinData, setOrderJoinData] = useState([]);
    const [getOrderData, setGetOrderData] = useState([]);
    const [loading, setLoading] = useState(false);

    const id = localStorage.getItem('id');

    const oidArray = JSON.parse(localStorage.getItem('oidArray')) || [];
    const oid = oidArray.map((item) => item[0])

    const fetchAPI = async () => {
        setLoading(true);
        const response = await getOrder();
        if (!response) {
            Swal.fire({
                icon: 'error',
                title: 'ເກີດຂໍ້ຜິດພາດ',
                text: "ດຶງຂໍ້ມູນບໍ່ສຳເລັດ",
                width: "300px"
            });
        } else {
            setGetOrderData(response);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <div className='w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-sm mx-auto justify-center'>
                    <Link to={`/${id}`} className='absolute left-0 text-[24px]'>
                        <IoIosArrowBack />
                    </Link>
                    <h2 className='text-[20px] font-semibold'>ອໍດີ້ທີ່ລໍຖ້າອະນຸມັດ</h2>
                </div>
            </div>
            <div className='h-full mt-2 max-w-sm mx-auto overflow-x-auto p-2'>
                <table className='w-max table-auto shadow-md'>
                    <thead className='text-[15px] bg-[#d5e2bb]'>
                        <tr>
                            <th className='font-medium py-3 px-3'>ເລກໂຕະ</th>
                            <th className='font-medium py-3 px-3'>ເລກອໍດີ້</th>
                            <th className='font-medium py-3 px-3'>ວັນທີ່</th>
                            <th className='font-medium py-3 px-3'>ສະຖານະ</th>
                            <th className='font-medium py-3 px-3'>ລາຄາທັງໝົດ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getOrderData
                                .filter(item => oid.includes(item.OID))
                                .map((item, index) => (
                                    item.status == "ຍົກເລີກ" && (
                                        <tr key={index}>
                                            <td className='text-center py-5 font-medium'>{item.noTable}</td>
                                            <td className='text-center py-5 font-medium'>{item.OID}</td>
                                            <td className='text-center py-5 px-2 font-medium'>{item.createdAt}</td>
                                            <td className='text-center py-5 px-2 font-medium'>
                                                <div className={`flex justify-center items-center gap-2  font-semibold ${item.status == "ສຳເລັດ" ? "text-green-500" : item.status == "ກຳລັງດຳເນີນ" ? "text-orange-200" : " text-red-400"}`}>
                                                    <span>{item.status}</span> {item.status == "ສຳເລັດ" ? <FaCheckCircle /> : <BiBlock />}
                                                </div>
                                            </td>
                                            <td className='text-center py-5 px-2 font-medium'>
                                                <div className='flex w-full justify-center gap-1 items-center'>
                                                    <span>{formatNumber(item.totalPrice)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
