import React from "react";
import bgImage from '../assets/BGimage.avif'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import forecast from "../services/weatherdata.js";


export default function Home(){


  const [city,setCity] = useState("");
  const [dateTime,setDateTime] = useState(new Date());
  const [time,setTime] = useState("AM");
  const [hours,setHours] = useState(30);


  const navigate = useNavigate();

  const handlecity = (e) =>{
    setCity(e.target.value);
  }
  const handledays = (e) =>{
    const today = new Date(dateTime);
    let days = parseInt(e.target.value);
    if(!days) days = 0;
    today.setDate(today.getDate() + days);
    setDateTime(today);  
  }
  const handletime = (e) =>{
    setTime(e.target.value);
  }
  const handlehours = (e) =>{
    let hr = parseInt(e.target.value);
    if(time === "PM" && hr !== 12){
      hr += 12;
    }
    if(time === "AM" && hr === 12){
      hr = 0;
    }
    setHours(hr);
  }

  const handlesubmit = async (e) =>{

    e.preventDefault();
    if(city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    if(hours >= 30){
      alert("Please enter a valid time");
      return;
    }
    const updatedDate = new Date(dateTime);
    updatedDate.setHours(hours);
    updatedDate.setMinutes(0);
    updatedDate.setSeconds(0);
    const finalDate = updatedDate.toString();



    try {
      const result = await forecast(city.toLowerCase(),finalDate);
  
      navigate("/weather",{
          state:{
            lat: result.coordinates.lat,
            long: result.coordinates.lon,
            weather: result.weather.weather[0].main,
            temp: result.weather.main.temp,
            humidity: result.weather.main.humidity,
            wind: result.weather.wind.speed,
            description: result.weather.weather[0].description,
            icon: result.weather.weather[0].icon
          }
      });
    } catch (error) {
      console.log(error.message);
    }

  }


    return(
        <div className='relative w-full min-h-screen bg-cover bg-center bg-no-repeat'
              style={{backgroundImage:`url(${bgImage})`}}
            >
              <div className='absolute inset-0 bg-black/75'></div>
              <div className="relative py-[2em]">
                  <div className='text-center mb-[0.5em] text-white font-medium text-2xl md:text-3xl'>
                    Get Weather-Forecast of your city!
                  </div>
                  <div className='w-full min-h-[50vh] md:w-[40%] bg-gray-700 opacity-80  mx-auto rounded-md pt-[2em] overflow-y-auto mt-[1em] md:mt[0.5em]'>
                    <h3 className='text-center text-white text-xl md:text-2xl font-medium'>
                      Enter Details
                    </h3>
                    <form 
                      action="" 
                      method="post" 
                      className=''
                      onSubmit={handlesubmit}
                    >
                      <input type="text" 
                      placeholder='Enter city'
                      className='bg-white w-[90%] md:w-[70%] block mx-auto my-[2em] border-gray-400 rounded-lg p-[0.5em] outline-none'
                      onChange={handlecity}
                      />
                      <div className="flex justify-center w-full">
                        <div className="flex w-[90%] md:w-[70%]">
                        <label htmlFor="days" className=" rounded-l-lg bg-white p-[0.5em]">Days:</label>
                        <select
                        name="days" 
                        id="days" 
                        className='bg-white w-full border-gray-400 rounded-r-lg p-[0.5em] outline-none'
                        onChange={handledays}
                        >
                        <option value="" disabled selected>select days</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        </select>
                        </div>

                      </div>
                      
                      
                      <label htmlFor="time"></label>
                      <select
                       name="time" 
                       id="time"
                       className='bg-white w-[90%] md:w-[70%] block mx-auto my-[2em] border-gray-400 rounded-lg p-[0.5em] outline-none'
                       onChange={handletime}
                       >
                        <option  value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                      <div className="flex justify-center w-full">
                        <div className="flex w-[90%] md:w-[70%]">
                        <label htmlFor="hours" className=" rounded-l-lg bg-white p-[0.5em]">Hours:</label>
                        <select
                        name="hours" 
                        id="hours" 
                        className='bg-white w-full border-gray-400 rounded-r-lg p-[0.5em] outline-none'
                        onChange={handlehours}
                        >
                        <option value="" disabled selected>select hours</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        </select>
                        </div>

                      </div>
                  
                      <button
                      type='submit'
                      className='block mx-auto my-[1em] py-[1em] px-[2.5em] rounded-lg shadow-md shadow-white/80 bg-green-900 text-center text-white font-medium hover:bg-green-700 cursor-pointer'
                      >
                        Search
                      </button>
                      
                      
                    </form>
                  </div>
              </div>
              
            </div>
    );

}