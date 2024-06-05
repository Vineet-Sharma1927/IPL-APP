import React from 'react'
import { useParams } from 'react-router-dom'
import InPageNavigation from './inPageNavigation'
import { useState, useEffect } from 'react'

const MatchDetail = () => {
    
    let { id } = useParams();  // it generates the object so to get the value directly we write id inside the object

    const [data, setdata] = useState([])

    async function fetchmatchDetail() {
        const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setdata(result);
            // console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchmatchDetail()
    }, [])

    return (
        <>
            <div className=' w-[100%]'>
                <h1 className='text-2xl font-bold text-center p-4'>Squad Info </h1>
                {
            data.length <= 0 ? (<h1>Loading....</h1>) : (
                <InPageNavigation
                    teams={[
                        data.matchInfo.team1.shortName,
                        data.matchInfo.team2.shortName,
                    ]}>

                       
                    {
                        data.matchInfo.team1.playerDetails.map((data, i) => (
                            <div key={i} className='border margin-4 p-2 '>
                                <h1 className='text-bold text-lg mb-1'>{data.fullName}</h1>
                                <h1 className='text-semibold text-sm text-gray-300'>{data.role}</h1>
                            </div>
                        ))
                    }
                    {
                        data.matchInfo.team2.playerDetails.map((data, i) => (
                            <div key={i} className='border margin-4 p-2'>
                                <h1 className='text-bold text-lg mb-1'>{data.fullName}</h1>
                                <h1 className='text-semibold text-sm text-gray-300'>{data.role}</h1>
                            </div>
                        ))
                    }

                </InPageNavigation>
                 )
            }  

            </div>
        </>
    )
}

export default MatchDetail
