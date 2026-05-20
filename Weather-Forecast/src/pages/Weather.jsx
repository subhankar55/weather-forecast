import React from "react";
import Map from "./Map.jsx";
import { useLocation } from "react-router-dom";
import {WeatherProvider} from "../contexts";
import { useNavigate } from "react-router-dom";




export default function Weather(){
    

    const location = useLocation();
    const {lat,long,weather,temp,humidity,wind,description,icon} = location.state;
    
    const navigate = useNavigate();
    const handleClick = (e) =>{
        e.preventDefault();
        navigate("/");
    }

    return (
        <WeatherProvider value={{long,lat,icon}}>
        <div className="bg-gray-700 min-h-screen w-full p-[1em] bg-cover">
            <h1 className="text-white text-center font-bold text-1xl md:text-3xl mb-[1em]">
                Weather-Forecast of your city!
            </h1>
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-[30%] h-[45vh] md:h-[80vh]  mx-auto rounded-t-md md:rounded-t-none md:rounded-l-lg overflow-hidden">
                <Map/>
                </div>
                <div className="w-full md:w-[70%] bg-gray-800 mx-auto rounded-b-md md:rounded-b-none md:rounded-r-lg">
                    <h1 className="text-center text-white mb-[0.5em] font-medium text-1xl md:text-2xl">
                        Weather Report:
                    </h1>
                    <ol className="flex flex-col justify-center items-center">
                        <li className="m-[0.5em] text-white text-sm md:text-xl">Temperature: {(temp - 273.15).toFixed(2)} °C</li>
                        <li className="m-[0.5em] text-white text-sm md:text-xl">Humidity: {humidity}%</li>
                        <li className="m-[0.5em] text-white text-sm md:text-xl">Wind Speed: {(wind * 3.6).toFixed(2)} km/hr</li>
                        <li className="m-[0.5em] text-white text-sm md:text-xl">Description: {description}</li>
                        <li className="m-[0.5em] text-white text-sm md:text-xl">Weather: {weather}</li>
                    </ol>
                </div>
            </div>

            <button 
            onClick={handleClick}
            className="block mx-auto my-[1em] bg-gray-300 rounded-3xl px-[1.2em] py-[0.3em] cursor-pointer hover:bg-gray-500 hover:text-white text-2xl font-medium">
                🡐 Back
            </button>
            
        </div>
        </WeatherProvider>
    );
}