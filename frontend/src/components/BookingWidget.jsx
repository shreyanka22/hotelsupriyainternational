import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function BookingWidget({ openDialog }) {

  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  const [guests,setGuests] = useState(1)

  return(

    <div className="glass p-6 rounded-xl flex flex-wrap gap-6 items-end mt-6">

      {/* CHECK IN */}

      <div className="flex flex-col">

        <label className="text-xs text-gray-400">
          Check-in
        </label>

        <DatePicker
          selected={startDate}
          onChange={(date)=>setStartDate(date)}
          placeholderText="Select date"
          className="bg-black border border-gray-700 rounded px-3 py-2 mt-1"
        />

      </div>


      {/* CHECK OUT */}

      <div className="flex flex-col">

        <label className="text-xs text-gray-400">
          Check-out
        </label>

        <DatePicker
          selected={endDate}
          onChange={(date)=>setEndDate(date)}
          placeholderText="Select date"
          className="bg-black border border-gray-700 rounded px-3 py-2 mt-1"
        />

      </div>


      {/* GUESTS */}

      <div className="flex flex-col">

        <label className="text-xs text-gray-400">
          Guests
        </label>

        <div className="flex items-center gap-3 mt-1">

          <button
            onClick={()=>setGuests(Math.max(1,guests-1))}
            className="bg-gray-800 w-8 h-8 rounded"
          >
            -
          </button>

          <span>{guests}</span>

          <button
            onClick={()=>setGuests(guests+1)}
            className="bg-gray-800 w-8 h-8 rounded"
          >
            +
          </button>

        </div>

      </div>


      {/* BUTTON */}

      <button
        onClick={openDialog}
        className="gold-gradient px-6 py-3 rounded-lg text-black font-semibold hover:scale-105 transition"
      >
        Check Availability
      </button>

    </div>

  )
}