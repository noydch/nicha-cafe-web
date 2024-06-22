import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";
import useStore from '../../components/store';
import formatNumber from '../../components/formatNumber';
import { dataProduct } from '../home/data';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const cart = useStore((state) => state.cart);
    const removeItem = useStore((state) => state.removeItem);
    // console.log(useStore((state) => state.cart));
    const updateQty = useStore((state) => state.updateQty)

    const addQty = (id) => {
        updateQty(id, 1)
    }
    const minusQty = (id) => {
        updateQty(id, -1)
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className=' w-full'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-[400px] mx-auto justify-center'>
                    <IoIosArrowBack onClick={() => window.location.href = "/"}
                        className=' absolute left-0 text-[24px]' />
                    <h2 className=' text-[20px] font-semibold'>ກະຕ່າສິນຄ້າ</h2>
                </div>
            </div>
            <div className='h-full mt-2 max-w-[400px] max mx-auto overflow-x-auto p-2'>
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
                                            <td className=' text-center py-5 font-medium'>{item.id}</td>
                                            <td className=' py-1'>
                                                <img src={item.picture} alt=""
                                                    className=' w-16 h-16 object-cover rounded-md'
                                                />
                                            </td>
                                            <td className=' text-center py-5 px-2 font-medium'>{item.nameLao}</td>
                                            <td className=' text-center py-5 px-2 font-medium'>{formatNumber(item.price)}</td>
                                            <td className=' text-center py-5 px-2 font-medium'>
                                                <div className=' flex w-full justify-center gap-1 items-center'>
                                                    <div onClick={() => minusQty(item.id)}
                                                        className=' w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full'
                                                    >
                                                        <LuMinus className=' text-[14px]' />
                                                    </div>
                                                    <span>{item.quantity == 0 ? removeItem(item.id) : item.quantity}</span>

                                                    <div onClick={() => addQty(item.id)}
                                                        className=' w-4 h-4 bg-green-500 text-white flex items-center justify-center rounded-full'
                                                    >
                                                        <LuPlus className=' text-[14px]' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=' text-center py-5 px-2 font-medium'>
                                                {formatNumber(item.price * item.quantity)}
                                            </td>
                                            <td className=' text-center py-5 px-2'><FaTrashAlt onClick={() => removeItem(item.id)} className=' w-full text-red-600 cursor-pointer' /></td>
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
            <div className=' w-full max-w-[400px] max mx-auto'>
                <div className=' flex justify-center flex-col items-center mt-10 shadow-md py-4 rounded-lg'>
                    <h1 className=' text-[20px] font-bold text-red-500'>ຈຳນວນເງິນທີ່ຕ້ອງຊຳລະ</h1>
                    <h1 className=' text-[18px] font-bold text-green-500'>
                        {formatNumber(totalPrice)}
                    </h1>
                </div>
                <div className=' flex justify-end mt-10'>
                    <Link to={'/payment'}
                        className=' bg-green-300 px-5 py-2 rounded-md font-semibold'>ຢືນຢັນການສັ່ງຊື້</Link>
                </div>
            </div>
        </div>
    )
}
