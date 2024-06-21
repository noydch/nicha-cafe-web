import React from 'react'
import { Navbar } from '../../components/Navbar'

import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { HomeProduct } from './HomeProduct';

export const Home = () => {
    return (
        <Navbar>
            <div className=' w-full bg-white h-screen'>
                <div className=' bg-[#ffecd5]  w-full'>
                    <div className=' max-w-[400px] mx-auto '>
                        <div className='py-1.5'>
                            <div className='flex items-center justify-around px-3 gap-x-1'>
                                <div className=' relative w-full flex items-center '>
                                    <select className=' w-full border-2 border-black p-3 py-2 rounded-md appearance-none outline-none'>
                                        <option value="">ປະເພດສິນຄ້າ</option>
                                        <option value="">ກາເຟ</option>
                                    </select>
                                    <MdOutlineArrowDropDown className=' absolute right-2 text-[20px]' />
                                </div>

                            </div>
                            <div className=' flex justify-between items-center mt-2'>
                                <div className=' [270px] relative flex items-center'>
                                    <input type="text"
                                        placeholder='Search'
                                        className=' w-[270px] pl-9 border-2 border-black outline-none py-2 rounded-md'
                                    />
                                    <IoSearch className=' absolute left-2 text-[22px]' />
                                </div>
                                <button className=' bg-[#d5e2bb] py-2 w-[100px] rounded-md'>ຄົ້ນຫາ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeProduct />
            </div>
        </Navbar>
    )
}
