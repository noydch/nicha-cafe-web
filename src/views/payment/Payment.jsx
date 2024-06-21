import React, { useState } from 'react'

export const Payment = () => {
    const [image, setImage] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(URL.createObjectURL(file))
        }
    }
    return (
        <div className=' w-full bg-white h-screen relative'>
            <div className='bg-[#fffcf2] h-[60px] w-full shadow'>
                <div className='relative flex items-center h-full max-w-[400px] mx-auto justify-center'>

                    <h2 className=' text-[20px] font-semibold'>ກະຕ່າສິນຄ້າ</h2>
                </div>
            </div>
            <div className=' text-center mt-4 font-semibold '>
                <div>
                    ຊຳລະຜ່ານການສະແກນ QR ນີ້ <br />
                    ຈຳນວນເງິນທີ່ຕ້ອງຈ່າຍ <br /> <span className=' text-green-500 font-bold'>155,000</span> ກີບ
                </div>
                <div className=' w-full flex flex-col items-center mt-2'>
                    <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt=""
                        className=' w-[200px]'
                    />
                    <div>
                        <label htmlFor="uploadImg">ອັບໂຫລດສະລຶປການໂອນ</label>
                        <input type="file" id='uploadImg'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='block w-[200px] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                        />
                    </div>
                    {image && (
                        <div className=' mt-3'>
                            <img src={image} alt="" className=' w-[200px]' />
                        </div>
                    )}
                </div>
            </div>
            <div className=' w-full flex justify-between mt-10 absolute bottom-5'>
                <button className=' w-[170px] rounded-lg text-center bg-gray-400 py-3'>ຍົກເລີກ</button>
                <button className=' w-[170px] rounded-lg text-center bg-green-400 py-3'>ຢືນຢັນການຊຳລະເງິນ</button>
            </div>
        </div>
    )
}
