import React, { useState } from 'react';
import { ReactTyped } from "react-typed";
import { Link } from 'react-router-dom';


export default function Home() {

return (
    <div className="font-bold text-[#1A4D2E]">
        <div className='max-w-[800px] mt-[24px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center'> 
            <p className='text-2xl font-bold p-2'>Cook delicious meals</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>with whats in your fridge.</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-3xl font-bold py-4 mr-3'>
                    I've got 
                </p>
                <ReactTyped className='md:text-5xl sm:text-4xl text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]' 
                strings={['apples', 'bananas', 'oranges', 'beef', 'chicken', 'pork', 'lamb', 'cheese', 'milk', 'eggs', 'almonds', 'hazelnuts', 'peanuts', 'sesame seeds']} 
                typeSpeed={90} backSpeed={140} loop/>
            </div>
            <Link to="/recipes" className="w-[200px] transition-colors duration-300 bg-[#1A4D2E] hover:bg-[#4F6F52] text-white font-bold my-5 py-4 rounded">
                Let's get cookin'
            </Link>
        </div>
    </div>
);

}
