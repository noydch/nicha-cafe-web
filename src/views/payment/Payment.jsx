import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useStore from '../../components/store'
import formatNumber from '../../components/formatNumber'
import { addOrderTableNo, getOrder } from '../../api/order'
import { addOrderDetail } from '../../api/orderDetail'

export const Payment = () => {
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const cart = useStore((state) => state.cart);
    const clearCart = useStore((state) => state.clearCart);
    const checkout = useStore((state) => state.checkout)
    const selectTable = useStore((state) => state.selectTable);
    const [dataImg, setDataImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [getOrderData, setGetOrderData] = useState([])

    const id = localStorage.getItem('id')
    if (!id) {
        console.log("not found id");
    }


    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setDataImg(file)
            setImage(URL.createObjectURL(file))
        }
    }
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    // total quantity * price
    const total = cart.reduce((total, item) => total + item.quantity * item.price, 0)

    // const fetchAPI = async () => {
    //     setLoading(true)
    //     const response = await getOrder();
    //     setGetOrderData(response)
    //     setLoading(false)
    // }
    // useEffect(() => {
    //     fetchAPI()
    //     // console.log(getOrderData);
    // }, [])

    const confirmPayment = async () => {
        setLoading(true)
        const data = {
            noTable: id,
            totalPrice: total,
            file: dataImg
        }
        const response = await addOrderTableNo(data);

        if (!response) {
            Swal.fire({
                icon: 'error',
                title: 'ເກີດຂໍ້ຜິດພາດ',
                text: "ຂໍ້ມູນບໍ່ຄົບ",
                width: "300px"
            })
            setLoading(false)
            return
        }
        // localStorage.setItem('oid', [response])
        const newOID = [response]; // สมมติว่า OID อยู่ใน response.OID

        // ดึงอาร์เรย์ OID จาก localStorage
        let oidArray = JSON.parse(localStorage.getItem('oidArray')) || [];

        // เพิ่ม OID ใหม่เข้าไปในอาร์เรย์
        oidArray.push(newOID);

        // บันทึกอาร์เรย์ OID ที่อัปเดตแล้วลง localStorage
        localStorage.setItem('oidArray', JSON.stringify(oidArray));
        console.log(oidArray);


        for (let item of cart) {
            const data2 = {
                orders_id: response,
                product_id: item.PID,
                qty: item.quantity,
                total: item.price * item.quantity
            }
            const response2 = await addOrderDetail(data2)
            if (!response2) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add order detail'
                })
                setLoading(false)
                return
            }
        }

        setLoading(true)
        Swal.fire({
            icon: 'success',
            title: "ຊຳລະເງິນສຳເລັດ!",
            width: '300px'
        }).then(() => {
            clearCart()
            navigate('/historyAwait')
            checkout()
        });
    }


    return (
        <div className='w-full max-w-sm mx-auto bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-sm mx-auto justify-center'>
                    <h2 className=' text-[20px] font-semibold'>ການຊຳລະເງິນ</h2>
                </div>
            </div>
            <div className=' text-center mt-10 pb-[60px] font-semibold '>
                <h1 className=' text-[20px] font-bold text-red-500'>ໂຕະ {id}</h1>
                <h2 className=' mb-5'>
                    ຊຳລະຜ່ານການສະແກນ QR ນີ້ <br />
                    ຈຳນວນເງິນທີ່ຕ້ອງຈ່າຍ <br /> <span className=' text-green-500 font-bold'>{formatNumber(totalPrice)}</span> ກີບ
                </h2>
                <div className=' w-full flex flex-col items-center mt-2'>
                    <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt=""
                        className=' w-[250px]  mb-5'
                    />
                    <div>
                        <label htmlFor="uploadImg" className=' text-[18px]'>ອັບໂຫລດສະລິປການໂອນ</label>
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
            <div className='fixed bottom-0 max-w-sm w-full'>
                <div className=' items-center flex justify-around w-full mt-10  bg-white h-[60px]'>
                    <Link to={'/cart'}
                        className=' w-[150px] rounded-md text-center bg-gray-400 py-1.5'>ຍົກເລີກ</Link>
                    <button onClick={confirmPayment}
                        className=' w-[150px] rounded-md text-center bg-green-400 py-1.5'>
                        {
                            loading ? "ກຳລັງດຳເນີນການ..." : "ຢືນຢັນການຊຳລະເງິນ"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
