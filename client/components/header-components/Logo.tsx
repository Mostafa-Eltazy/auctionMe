import React from 'react'
import { GiGreekTemple } from 'react-icons/Gi'

const  Logo = () => {
  return (
    <div className="flex flex-col items-center">
    <p className="bg-transparent text-blue-500">
      <GiGreekTemple style={{ fontSize: '30px' }} />
    </p>
    <span className="font-serif text-slate-600">
      <i>A</i>uctionMe
    </span>
  </div>
  )
}

export default Logo