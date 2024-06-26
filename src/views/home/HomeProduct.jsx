import React, { useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa";
import useStore from '../../components/store';
import Swal from 'sweetalert2';
import { getProductApi, searchProductApi } from '../../api/product';

export const HomeProduct = ({ selectedType, product, search }) => {
    const addToCart = useStore((state) => state.addToCart);

    const [loading, setLoading] = useState(false);
    const [searchProduct, setSearchProduct] = useState([])

    const filteredProducts = product.filter((item) => selectedType == '' || item.product_type == selectedType);

    return (
        <div className='w-full bg-white max-w-sm mx-auto mt-2'>
            {loading ? (
                <div className=' flex justify-center items-center h-screen'>
                    <p>Loading...</p>
                </div>
            ) : (
                <ul className='grid grid-cols-3 gap-2 p-2'>
                    {filteredProducts.map((item, index) => (
                        <li key={index} className='w-full h-[170px] bg-[#fffcf2] p-1 rounded-md shadow-md'>
                            <div className='w-full h-full relative'>
                                <div className='w-full'>
                                    <img src={item.image} alt="" className='w-[170px] rounded-md h-[100px] object-cover' />
                                </div>
                                <p className='text-[13px] font-medium leading-[1.2] mt-2'>{item.name}</p>
                                <div className='flex w-full items-center justify-between absolute bottom-0 '>
                                    <p className='text-[14px] font-semibold'>
                                        <span className='mr-1'>{item.price}</span>₭
                                    </p>
                                    <div className='bg-[#e3f3da] p-1 rounded-md text-[#daa7e2]' onClick={() => addToCart(item)}>
                                        <FaCartPlus />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
