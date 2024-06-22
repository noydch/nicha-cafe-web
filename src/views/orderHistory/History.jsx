import React from 'react'
import useStore from '../../components/store'

export const History = () => {
    const addOrderHistory = useStore((stete) => stete.addOrderHistory);
    const orderHistory = useStore((state) => state.orderHistory)

    return (
        <div className=' w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-[400px] mx-auto justify-center'>
                    <h2 className=' text-[20px] font-semibold'>ປະຫວັດການສັ່ງຊື້</h2>
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
                        orderHistory.length > 0 ? (
                            <tbody>
                                {
                                    orderHistory.map((item, index) => (
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
        </div>
    )
}
