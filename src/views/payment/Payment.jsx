import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useStore from '../../components/store'
import formatNumber from '../../components/formatNumber'

export const Payment = () => {
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const cart = useStore((state) => state.cart);
    const clearCart = useStore((state) => state.clearCart);
    const checkout = useStore((state) => state.checkout)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    const confirmPayment = () => {
        Swal.fire({
            icon: 'success',
            title: "ຊຳລະເງິນສຳເລັດ!",
            width: '300px'
        }).then(() => {
            navigate('/history')
            checkout()
        });
    }

    return (
        <div className=' w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-[400px] mx-auto justify-center'>

                    <h2 className=' text-[20px] font-semibold'>ການຊຳລະເງິນ</h2>
                </div>
            </div>
            <div className=' text-center mt-10 font-semibold '>
                <h2 className=' mb-5'>
                    ຊຳລະຜ່ານການສະແກນ QR ນີ້ <br />
                    ຈຳນວນເງິນທີ່ຕ້ອງຈ່າຍ <br /> <span className=' text-green-500 font-bold'>{formatNumber(totalPrice)}</span> ກີບ
                </h2>
                <div className=' w-full flex flex-col items-center mt-2'>
                    <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt=""
                        className=' w-[250px]  mb-5'
                    />
                    <div>
                        <label htmlFor="uploadImg" className=' text-[18px]'>ອັບໂຫລດສະລຶປການໂອນ</label>
                        <input type="file" id='uploadImg'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='block w-[300px] mt-2 mb-5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                        />
                    </div>
                    {image && (
                        <div className=' mt-3'>
                            <img src={image} alt="" className=' w-[250px]' />
                        </div>
                    )}
                </div>
            </div>
            <div className=' w-full mx-auto items-center flex justify-around mt-10 absolute bottom-5'>
                <Link to={'/cart'}
                    className=' w-[170px] rounded-lg text-center bg-gray-400 py-3'>ຍົກເລີກ</Link>
                <button onClick={confirmPayment}
                    className=' w-[170px] rounded-lg text-center bg-green-400 py-3'>ຢືນຢັນການຊຳລະເງິນ</button>
            </div>
        </div>
    )
}
