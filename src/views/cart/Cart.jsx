import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";
import useStore from '../../components/store';
import formatNumber from '../../components/formatNumber';
import { dataProduct } from '../home/data';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Cart = () => {
    const cart = useStore((state) => state.cart);
    const removeItem = useStore((state) => state.removeItem);
    const updateQty = useStore((state) => state.updateQty)
    const setSelectTable = useStore((state) => state.setSelectTable)
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState([])

    const id = localStorage.getItem('id')
    if (!id) {
        console.log("not found id");
    }


    const addQty = (id) => {
        updateQty(id, 1)
    }
    const minusQty = (id) => {
        updateQty(id, -1)
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)


    return (
        <div className=' w-full h-screen bg-blue-gray-700'>
            <div className=' max-w-sm mx-auto h-full relative bg-white pb-[70px]'>
                <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                    <div className='relative flex items-center h-full max-w-sm mx-auto justify-center'>
                        <Link to={`/${id}`} className='absolute left-0 text-[24px]'>
                            <IoIosArrowBack
                            />
                        </Link>
                        <h2 className=' text-[20px] font-semibold'>ກະຕ່າສິນຄ້າ</h2>
                    </div>
                </div>
                <div className='mt-2 max-w-sm max mx-auto overflow-x-auto p-2'>
                    <table className=' w-max table-auto shadow-md '>
                        <thead className='text-[15px] bg-[#d5e2bb]'>
                            <tr className=''>
                                <th className=' font-medium py-3 px-3'>ລະຫັດສິນຄ້າ</th>
                                <th className=' font-medium py-3 px-3'>ຮູບສິນຄ້າ</th>
                                <th className=' font-medium py-3 px-3'>ຊື່ສິນຄ້າ</th>
                                <th className=' font-medium py-3 px-3'>ລາຄາ</th>
                                <th className=' font-medium py-3 px-3'>ຈຳນວນ</th>
                                <th className=' font-medium py-3 px-3'>ລາຄາລວມ</th>
                                <th className=' font-medium py-3 px-3'>Action</th>
                            </tr>
                        </thead>
                        {
                            cart.length > 0 ? (
                                <tbody>
                                    {
                                        cart.map((item, index) => (
                                            <tr key={index}>
                                                <td className=' text-center py-5 font-medium'>{item.PID}</td>
                                                <td className=' py-1'>
                                                    <img src={item.image} alt=""
                                                        className=' w-16 h-16 object-cover rounded-md'
                                                    />
                                                </td>
                                                <td className=' text-center py-5 px-2 font-medium'>{item.name}</td>
                                                <td className=' text-center py-5 px-2 font-medium'>{formatNumber(item.price)}</td>
                                                <td className=' text-center py-5 px-2 font-medium'>
                                                    <div className=' flex w-full justify-center gap-1 items-center'>
                                                        <div onClick={() => minusQty(item.PID)}
                                                            className=' w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full'
                                                        >
                                                            <LuMinus className=' text-[14px]' />
                                                        </div>
                                                        <span>{item.quantity == 0 ? removeItem(item.PID) : item.quantity}</span>

                                                        <div onClick={() => addQty(item.PID)}
                                                            className=' w-4 h-4 bg-green-500 text-white flex items-center justify-center rounded-full'
                                                        >
                                                            <LuPlus className=' text-[14px]' />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=' text-center py-5 px-2 font-medium'>
                                                    {formatNumber(item.price * item.quantity)}
                                                </td>
                                                <td className=' text-center py-5 px-2'><FaTrashAlt onClick={() => removeItem(item.PID)} className=' w-full text-red-600 cursor-pointer' /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            ) :
                                <tbody>
                                    <tr>
                                        <td className=' py-3 text-[22px] font-semibold'
                                            colSpan={7} align='center'>ບໍ່ມີສິນຄ້າ</td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                </div>
                <div className=' w-full max-w-sm mx-auto'>
                    <div className=' flex justify-center flex-col items-center mt-10 pb-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-10 mx-5 rounded-lg'>
                        <h1 className=' text-[20px] font-bold text-red-500'>ຈຳນວນເງິນທີ່ຕ້ອງຊຳລະ</h1>
                        <h1 className=' text-[18px] font-bold text-green-500'>
                            {formatNumber(totalPrice)}
                        </h1>

                    </div>
                </div>
                <div className=' flex absolute justify-end items-center bottom-0 right-0 h-[70px] bg-white w-full'>
                    <Link to={'/payment'}
                        className=' bg-green-300 px-5 py-2 rounded-md font-semibold mr-5'>ຢືນຢັນການສັ່ງຊື້</Link>
                </div>
            </div>
        </div>
    )
}
