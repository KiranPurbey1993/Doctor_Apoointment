import './App.css';
import {BiCalendar } from "react-icons/bi";
import Search from './components/Search';
import AddAppointment from './components/AddAppointment';

import AppointmentInfo from './components/AppointmentInfo';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const inputRef = useRef(null);
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery]=useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filterAppointments =appointmentList.filter(
    item=>{
      return (
        item.petName.toLowerCase().includes(query.toLocaleLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLocaleLowerCase())  ||
        item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase()) 
      )
    }
  ).sort((a,b)=>{
    let order = (orderBy === 'asc')? 1:-1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
      -1 * order : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data=>{
      setAppointmentList(data)
    });

  },[]);

  useEffect(()=>{
    inputRef.current.focus();
    fetchData()
  }, [fetchData]);


  return (
    <div className="App container p-2 max-w-screen-lg m-auto ">
      <h1 className='flex items-center gap-x-1 text-xl'>
        <BiCalendar className='text-blue-600 font-bold'/> Your Appointments
      </h1>
      <AddAppointment 
      onSendAppointments={myAppointment=>setAppointmentList([...appointmentList, myAppointment])}
      lastId={
        appointmentList.reduce((max, item)=>{return Number(item.id) > max ? Number(item.id) : max}, 0)
      }
      />
      <Search  query={query} onQueryChange={(myQuery)=>setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort)=>setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChnage={(mySort)=>setSortBy(mySort)}
        inputRef={inputRef}
      />
      <ul className='divide-y divide-gray-200'>
          {
            filterAppointments.map((appointment)=>{
             return(
                <AppointmentInfo  appointment={appointment} key={appointment.id}
                onDeleteAppointement={
                  appointmentId =>
                  setAppointmentList(appointmentList.filter(appointment=>
                    appointment.id !== appointmentId))
                } />
             ) 
            })
          }
      </ul>
    </div>
  );
}

export default App;
