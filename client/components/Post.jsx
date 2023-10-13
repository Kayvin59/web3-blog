import React from 'react'
import { truncateAddress } from '../utils'

export default function Post({ id, owner, address, postContent, removePost }) {
    return (
        <div className="lg:w-1/2 flex flex-col w-full h-full bg-white overflow-hidden mb-6 shadow-md rounded-[8px] pt-2 pb-5 px-6 box-border">
            { address ? 
              <div className="w-full inline-flex justify-between items-center mb-4">
                <div className="inline-flex items-center">
                  <div className="flex-1 pl-2">
                    <h2 className="font-openSans text-black mb-1">{truncateAddress(address)}</h2>
                  </div>
                </div>
                { owner === address && (
                  <button className="w-[10px] cursor-pointer" onClick={() => removePost(id)}>
                    <svg className="fill-current w-3 h-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.878px" height="122.88px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xml-space="preserve">
                      <g>
                        <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"></path>
                      </g>
                    </svg>
                  </button>                  
                )}
              </div>
            : ""}
            <div className="w-full justify-center items-center">
              <p className='font-openSans'>{postContent}</p>
            </div>
          </div>
      )
}
