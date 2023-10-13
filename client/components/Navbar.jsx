import React from 'react'
import { truncateAddress } from '../utils'

export default function Navbar({ connect, address }) {
    // const address = "0x1F58a081369967B2B4c4E2Ad0C44aF016132ef13"
  return (
    <div className='w-full flex justify-end p-3 bg-white'>
        { address ?
            <div className="border border-[#c7cacd] text-gray-600 px-2 py-1 rounded-[12px] inline-flex items-center">
                <h2 className="font-openSans text-black text-[12px]">{truncateAddress(address)}</h2>
            </div> :
            <button className="group/item border border-[#c7cacd] text-gray-600 px-2 py-1 rounded-[12px] inline-flex items-center cursor-pointer hover:bg-[#1974E7] hover:text-white transition"
                onClick={() => connect()}
            >
                <h2 className='font-openSans group-hover/item:text-white text-[#1974E7] transition'>Connect Wallet</h2>
            </button>
        }
    </div>
  )
}
