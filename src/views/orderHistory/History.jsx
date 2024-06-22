import React from 'react';
import useStore from '../../components/store';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import formatNumber from '../../components/formatNumber';

export const History = () => {
    const orderHistory = useStore((state) => state.orderHistory);

    return (
        <div className='w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-[400px] mx-auto justify-center'>
                    <IoIosArrowBack onClick={() => window.location.href = "/"}
                        className='absolute left-0 text-[24px]' />
                    <h2 className='text-[20px] font-semibold'>ປະຫວັດການສັ່ງຊື້</h2>
                </div>
            </div>
            <div className='h-full mt-2 max-w-[400px] mx-auto overflow-x-auto p-2'>
                <table className='w-max table-auto shadow-md'>
                    <thead className='text-[15px] bg-[#d5e2bb]'>
                        <tr>
                            <th className='font-medium py-3 px-3'>ລະຫັດສິນຄ້າ</th>
                            <th className='font-medium py-3 px-3'>ຮູບສິນຄ້າ</th>
                            <th className='font-medium py-3 px-3'>ຊື່ສິນຄ້າ</th>
                            <th className='font-medium py-3 px-3'>ລາຄາ</th>
                            <th className='font-medium py-3 px-3'>ຈຳນວນ</th>
                            <th className='font-medium py-3 px-3'>ລາຄາລວມ</th>
                            <th className='font-medium py-3 px-3'>ສະຖານະ</th>
                        </tr>
                    </thead>
                    {
                        orderHistory.length > 0 ? (
                            <tbody>
                                {
                                    orderHistory.map((order, orderIndex) => (
                                        order.items.map((item, index) => (
                                            <tr key={`${orderIndex}-${index}`}>
                                                <td className='text-center py-5 font-medium'>{item.id}</td>
                                                <td className='py-1'>
                                                    <img src={item.picture} alt=""
                                                        className='w-16 h-16 object-cover rounded-md'
                                                    />
                                                </td>
                                                <td className='text-center py-5 px-2 font-medium'>{item.nameLao}</td>
                                                <td className='text-center py-5 px-2 font-medium'>{item.price}</td>
                                                <td className='text-center py-5 px-2 font-medium'>
                                                    <div className='flex w-full justify-center gap-1 items-center'>
                                                        <span>{item.quantity}</span>
                                                    </div>
                                                </td>
                                                <td className='text-center py-5 px-2 font-medium'>
                                                    {formatNumber(item.price * item.quantity)}
                                                </td>
                                                <td className='text-center py-5 px-2'>
                                                    <div className='flex items-center gap-2 text-green-500 font-semibold'>
                                                        <span>ສຳເລັດ</span> <FaCheckCircle />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                        ) :
                            <tbody>
                                <tr>
                                    <td className='py-3 text-[22px] font-semibold'
                                        colSpan={7} align='center'>ບໍ່ມີປະຫວັດການສັ່ງຊື້</td>
                                </tr>
                            </tbody>
                    }
                </table>
            </div>
        </div>
    );
};
