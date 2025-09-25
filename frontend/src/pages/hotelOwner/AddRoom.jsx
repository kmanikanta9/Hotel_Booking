import React, { useState } from 'react'
import { assets } from '../../assets/data/assets'

const AddRoom = () => {
    const [images,setImages] = useState({
        1:null,
        2:null,
        3:null,
        4:null
    })

    const [inputs,setInputs] = useState({
        roomType:"",
        pricePerNight:"",
        amenities:{
            'Free Wi-Fi':false,
            'Free Breakfast':false,
            'Room Service':false,
            'Pool Access':false,
            'Mountain View':false
        }
    })
  return (
    <div>
        <form>
            {/* Add Title here */}
            {/* Upload Area for Images */}

            <p className='text-gray-800 mt-10'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key)=>(
                    <label htmlFor = {`roomImage${key}`} key={key}>
                        <img className='max-h-13 cursor-pointer opacity-80' src={images[key]?URL.createObjectURL(images[key]):assets.uploadArea} alt="" />
                        <input type="file" accept='image/*' id={`roomImage${key}`} onChange={(e)=>setImages({...images,[key]:e.target.files[0]})}  hidden/>
                    </label>
                ))}
            </div>

            <div className='w-full flex max-sm:flex-col sm:gap-4'>
                
                {/* Room Type */}
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mt-4'>Room Type</p>
                    <select onChange={e=>setInputs({...inputs,roomType:e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>

                <div>
                    {/* Price per night */}
                    <p className='text-gray-800 mt-4'>Price <span className='text-xs'>/night</span></p>
                    <input type="number" onChange={e=>setInputs({...inputs,pricePerNight:e.target.value})} className='border  border-gray-300 mt-1 rounded p-2 w-24' placeholder='0' value = {inputs.pricePerNight}/>
                </div>
            </div>

            <p className='text-gray-800 mt-4'>Amenities</p>
            <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                {Object.keys(inputs.amenities).map((item,index)=>(
                    <div key={index}>
                        <input type="checkbox" id={`amenities${index+1}`}  checked={inputs.amenities[item]} onChange={()=>setInputs({...inputs,amenities:{...inputs.amenities,[item]:!inputs.amenities[item]}})}/>
                        <label htmlFor="{`amenities${index+1}`} "> {item}</label>
                    </div>
                ))}

            </div>
            <button className='bg-blue-500 text-white px-8 py-2 rounded mt-8 cursor-pointer'>Add Room</button>
        </form>
    </div>
  )
}

export default AddRoom