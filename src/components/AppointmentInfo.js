import React from 'react'
import {BiTrash } from "react-icons/bi";
 const AppointmentInfo=({appointment, onDeleteAppointement})=> {
  return (
    <li className="px-3 py-3 flex items-start" >
    <button type="button" onClick={()=>onDeleteAppointement(appointment.id)}
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <BiTrash />
    </button>
        <div className="flex-grow">
        <div className="flex items-center">
            <span className="flex-none font-medium text-md text-blue-500">{appointment.petName}</span>
            <span className="flex-grow text-right text-xs">{appointment.aptDate}</span>
        </div>
        <div className='text-sm'><b className="font-bold  text-black-500">Owner:</b> {appointment.ownerName}</div>
        <div className="leading-tight text-sm">{appointment.aptNotes}</div>
        </div>
    </li>
  )
}

export default AppointmentInfo;
