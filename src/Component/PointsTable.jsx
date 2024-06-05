import React, { useEffect } from 'react'
import { useState } from 'react';

function PointsTable() {


    const [TableData, setTableData] = useState([]);

    async function fetchtabledata() {
        const url = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table';
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
            setTableData(result.pointsTable[0].pointsTableInfo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchtabledata()
    }, [])

    return (
        <>
            <div className=' w-full p-4 sm:w-[100%] md:w-[100%]'>

                <table className='w-full '>
                    <tr className='text-center w-full font-bold text-xl h-[60px]'>
                        <td className='text-left w-[40%]'>Team</td>
                        <td>M</td>
                        <td>W</td>
                        <td>L</td>
                        <td>nrr</td>
                        <td>Pts</td>
                    </tr>

                    {TableData.length < 0 ? <h1>Loading...</h1> :
                        TableData.map(({ matchesLost, matchesPlayed, matchesWon, teamName, nrr, points, teamImageId }, i) => (
                            <tr key={i} className='text-center w-full border-t border-gray-100/30 h-[50px]  '>
                                <div className='flex gap-5 mt-2'>
                                    <td className='w-4'>{i + 1}</td>
                                    <td>{<img className='w-[20px] h-[20px] rounded-full sm:w-[30px] sm:h-[30px] lg-w-[40px] lg:h-[35px]' src={`https://res.cloudinary.com/digkgdovw/image/upload/v1715267905/iplTeamLogo/${teamImageId}`} alt="" />}</td>
                                    <td className='text-bold'>{teamName}</td>
                                </div>
                                <td>{matchesPlayed}</td>
                                <td>{matchesWon}</td>
                                <td>{matchesLost}</td>
                                <td>{nrr}</td>
                                <td>{points}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    )
}

export default PointsTable
