import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'

import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { HomeProduct } from './HomeProduct';
import { getProductTypeApi } from '../../api/product_type';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { getProductApi, searchProductApi } from '../../api/product';

export const Home = () => {
    const { id: paramId } = useParams();
    const [id, setId] = useState('');

    useEffect(() => {
        if (!paramId || paramId === '/') {
            // setId('1');
            Swal.fire({
                icon: 'warning',
                title: "ແຈ້ງເຕືອນ",
                text: "ກະລຸນາສະແກນ QR ໂຕະກ່ອນ",
                width: "300px"
            });
        } else {
            setId(paramId);
        }
        localStorage.setItem('id', id);
    }, [paramId, id]);


    const [productType, setProductType] = useState([]);
    const [selectedType, setSelectedType] = useState('')
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        const response = await getProductTypeApi();
        if (!response) {
            Swal.fire({
                icon: 'error',
                title: "ເກີດຂໍ້ຜິດພາດ",
                text: "ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້"
            })
        }
        setProductType(response)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        // console.log(productType);
    }, [])

    const fetchData2 = async () => {
        setLoading(true);
        const response = await getProductApi();
        if (!response) {
            Swal.fire({
                icon: 'error',
                title: "ເກີດຂໍ້ຜິດພາດ",
                text: "ດຶງຂໍ້ມູນບໍ່ສຳເລັດ",
                width: "300px"
            });
            return;
        }
        setProduct(response);
        setLoading(false)
    };

    useEffect(() => {
        fetchData2();
    }, []);


    const handleProductType = (e) => {
        setSelectedType(e.target.value)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const onSearch = async () => {
        const responseSearch = await searchProductApi(search)
        // console.log(responseSearch);
        if (!responseSearch) {
            console.log("Error search");
        }
        setProduct(responseSearch)
    }

    useEffect(() => {
        if (search == '') {
            onSearch()
        }
        if (search) {
            onSearch()
        }
    }, [search])

    return (
        <Navbar>
            <div className=' w-full bg-white h-screen'>
                <div className=' bg-[#ffecd5]  w-full'>
                    <div className=' max-w-sm mx-auto '>
                        <div className='py-1.5'>
                            <div className='flex items-center justify-around px-3 gap-x-1'>
                                <div className=' relative w-full flex items-center '>
                                    <select onChange={handleProductType}
                                        className=' w-full cursor-pointer border-2 border-black p-3 py-2 rounded-md appearance-none outline-none'>
                                        <option value="" selected>ປະເພດສິນຄ້າ</option>
                                        {
                                            productType.map((item, index) => (
                                                <option value={item.PTID} key={index}
                                                    className=' w-full'
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <MdOutlineArrowDropDown className=' absolute right-2 text-[20px]' />
                                </div>

                            </div>
                            <div className=' flex justify-between items-center mt-2'>
                                <div className=' [270px] relative flex items-center'>
                                    <input type="text"
                                        onChange={handleSearch}
                                        value={search}
                                        placeholder='Search'
                                        className=' w-[270px] pl-9 border-2 border-black outline-none py-2 rounded-md'
                                    />
                                    <IoSearch className=' absolute left-2 text-[22px]' />
                                </div>
                                <button onClick={onSearch} className=' bg-[#d5e2bb] py-2 w-[100px] rounded-md'>ຄົ້ນຫາ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeProduct selectedType={selectedType} product={product} search={search} />
            </div>
        </Navbar>
    )
}
