
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

    const [matchesdata, setMatchesdata] = useState([]);

    // let filterdata = data.matchDetails.filter(singledata => singledata['matchDetailsMap'])

    // console.log(filterdata);


    async function fetchdata() {
        const url = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607';
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
            // console.log(result);
            let filterdata = result.matchDetails.filter(singledata => singledata['matchDetailsMap']);
            setMatchesdata(filterdata);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <>
            <div className='flex flex-wrap'>
                {matchesdata.map(({ matchDetailsMap: { match, key: date } }, i) => (
                    match.map(({ matchInfo: { team1: { teamSName: team1Name, imageId: team1img }, team2: { teamSName, imageId: team2img }, status, matchId, matchDesc, matchFormat }, matchScore }, j) => (
                        <Link key={j} to={`/matchDetail/${matchId}`} className='w-[50%] '>
                            {/* <h1 key={j}>{team1Name} Vs {teamSName}....{date}.... {status}</h1> */}
                            <div className='bg-gray-800 border p-3 flex flex-col gap-4 h-[150px] lg:h-[170px]'>
                                <div className='flex justify-between text-[12px]  md:text-[16px] '>
                                    <p>{matchFormat} {matchDesc}</p>
                                    <p>{date.split(' 2024')[0]}</p>
                                </div>
                                <div>
                                    <div className='flex justify-between text-[12px] md:text-[16px]'>
                                        <div className='flex gap-4 items-center '>
                                            <img className='w-[20px] h-[15px] rounded-full lg-w-[40px] lg:h-[35px]' src={`https://res.cloudinary.com/digkgdovw/image/upload/v1715267905/iplTeamLogo/${team1img}`} alt="img" />
                                            <p>{team1Name}</p>
                                        </div>
                                        <p>{matchScore?.team1Score?.inngs1?.runs}/{matchScore?.team1Score?.inngs1?.wickets} ({matchScore?.team1Score?.inngs1?.overs})</p>
                                    </div>
                                    <div className='flex justify-between text-[12px] md:text-[16px]'>
                                        <div className='flex gap-4 items-center'>
                                            <img className='w-[20px] h-[15px]  rounded-full lg-w-[40px] lg:h-[35px]' src={`https://res.cloudinary.com/digkgdovw/image/upload/v1715267905/iplTeamLogo/${team2img}`} alt="" />
                                            <p>{teamSName}</p>
                                        </div>
                                        <p>{matchScore?.team2Score?.inngs1?.runs}/{matchScore?.team2Score?.inngs1?.wickets} ({matchScore?.team2Score?.inngs1?.overs})</p>
                                    </div>
                                </div>
                                <p className='text-[12px] md:text-[16px]'>{status}</p>
                            </div>
                        </Link>
                    ))
                ))}
            </div>

        </>
    )
}

export default Home
