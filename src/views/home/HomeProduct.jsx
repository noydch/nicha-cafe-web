import React from 'react'
import { dataProduct } from './data'

import { FaCartPlus } from "react-icons/fa";
import useStore from '../../components/store';
import { Toaster } from 'react-hot-toast';

export const HomeProduct = () => {
    const addToCart = useStore((state) => state.addToCart)

    return (
        <div className=' w-full bg-white max-w-[400px] mx-auto mt-2'>

            <ul className='grid grid-cols-3 gap-2 p-2'>
                {
                    dataProduct.map((item, index) => (
                        <li key={index} className=' w-full h-[170px] bg-[#fffcf2] p-1 rounded-md shadow-md'>
                            <div className=' w-full h-full relative'>
                                <div className='w-full'>
                                    <img src={item.picture} alt=""
                                        className=' w-[170px] rounded-md h-[100px] object-cover'
                                    />
                                </div>
                                <p className=' text-[13px] font-medium leading-[1.05] mt-2'>{item.nameLao}</p>
                                <div className=' flex w-full items-center justify-between absolute bottom-0 '>
                                    <p className=' text-[14px] font-semibold'>
                                        <span className=' mr-1'>{item.price}</span>₭
                                    </p>
                                    <div className='bg-[#e3f3da] p-1 rounded-md text-[#daa7e2]'
                                        onClick={() => addToCart(item)}>
                                        <FaCartPlus />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
