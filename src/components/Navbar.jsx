import React, { useState } from 'react'
import logo from '../assets/logos.jpeg'
import { IoMenu, IoClose, IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdManageHistory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { dataProduct } from '../views/home/data';
import useStore from './store';
import { Link } from 'react-router-dom';

export const Navbar = ({ children }) => {
    const [showMenu, setShowManu] = useState(true);
    const cart = useStore((state) => state.cart);
    const navData = [
        {
            title: 'ໜ້າແລກ',
            icon: <IoHome />,
            path: '/'
        },
        {
            title: 'ປະຫວັດການຂາຍ',
            icon: <MdManageHistory />,
            path: '/history'
        }]
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <div className=' w-full bg-[#fffcf2]'>
            <nav className=' relative flex items-center justify-between max-w-[400px] mx-auto h-[60px]'>
                <div className=' border-2 rounded-full border-gray-400'>
                    <img src={logo} alt="" className=' w-12 rounded-full' />
                </div>
                <ul className={`absolute -right-7 top-12 bg-[#fffcf2] w-[180px] z-50 ${showMenu ? 'hidden' : 'block'}`}>
                    {
                        navData.map((item, index) => (
                            <Link to={item.path} key={index} className=' flex items-center gap-x-2 p-2 hover:bg-[#e3f3da]'>
                                <div>
                                    {item.icon}
                                </div>
                                <p>{item.title}</p>
                            </Link>
                        ))
                    }
                </ul>
                <div className=' flex items-center gap-x-5'>
                    <Link to={'/cart'} className=' relative flex' >
                        <FaShoppingCart className=' text-[24px] text-green-300' />
                        <span className=' absolute bg-red-500 h-3 w-3 flex items-center justify-center text-white rounded-full text-[10px] right-[-5px]'>
                            {totalQuantity}
                        </span>
                    </Link>
                    <div className=' sm:hidden block  text-[32px]' onClick={() => setShowManu(!showMenu)}>
                        {showMenu ? <IoMenu /> : <IoClose />}
                    </div>
                </div>

            </nav>
            {children}
        </div>
    )
}
