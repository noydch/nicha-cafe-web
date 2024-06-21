import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";
import useStore from '../../components/store';
import formatNumber from '../../components/formatNumber';

export const Cart = () => {
    const cart = useStore((state) => state.cart);
    const removeItem = useStore((state) => state.removeItem);
    // console.log(useStore((state) => state.cart));
    const [qty, setQty] = useState({})

    function addQty(itemId) {
        setQty((prevQty) => ({
            ...prevQty,
            [itemId]: (prevQty[itemId] || 1) + 1
        }))
    }
    function delQty(itemId) {
        setQty((prevQty) => ({
            ...prevQty,
            [itemId]: Math.max((prevQty[itemId] || 1) - 1, 1)
        }))
    }
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => {
            total += item.price * (qty[item.id] || 1)
        })
        return formatNumber(total)
    }

    function handleDel(id) {
        const updatedItem = [...cart]

        updatedItem.splice(id, 1)

    }
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
                                    <td className=' text-center py-5 px-2 font-medium'>{item.price}</td>
                                    <td className=' text-center py-5 px-2 font-medium'>
                                        <div className=' flex w-full justify-center gap-1 items-center'>
                                            <div onClick={() => delQty(item.id)}
                                                className=' w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full'
                                            >
                                                <LuMinus className=' text-[14px]' />
                                            </div>
                                            <span>{qty[item.id] || 1}</span>
                                            <div onClick={() => addQty(item.id)}
                                                className=' w-4 h-4 bg-green-500 text-white flex items-center justify-center rounded-full'
                                            >
                                                <LuPlus className=' text-[14px]' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center py-5 px-2 font-medium'>
                                        {/* {cart.reduce((total, item) => total + ((qty[item.id] || 0) * item.price), 0)} ₭ */}
                                        {formatNumber((qty[item.id] || 1) * item.price)} ກີບ
                                    </td>
                                    <td className=' text-center py-5 px-2'><FaTrashAlt onClick={() => removeItem(item.id)} className=' w-full text-red-600 cursor-pointer' /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className=' w-full max-w-[400px] max mx-auto'>
                <div className=' flex justify-center flex-col items-center mt-10 shadow-md py-4 rounded-lg'>
                    <h1 className=' text-[20px] font-bold text-red-500'>ຈຳນວນເງິນທີ່ຕ້ອງຊຳລະ</h1>
                    <h1 className=' text-[18px] font-bold text-green-500'>{totalPrice()} ກີບ</h1>
                </div>
                <div className=' flex justify-end mt-10'>
                    <button onClick={() => window.location.href = "/payment"}
                        className=' bg-green-300 px-5 py-2 rounded-md font-semibold'>ຢືນຢັນການສັ່ງຊື້</button>
                </div>
            </div>
        </div>
    )
}
