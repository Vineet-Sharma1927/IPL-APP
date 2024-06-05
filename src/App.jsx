import { Routes, Route } from "react-router-dom"
import Home from "./Component/home"
import MatchDetail from "./Component/matchDetail"
import Navbar from "./Component/Navbar"
import PointsTable from "./Component/PointsTable"


function App() {
    return (
        <>
            <div className="bg-black min-h-screen">
                <div className="w-[100%]  bg-gray-800 text-white min-height-screen mx-auto lg:w-[70%] ">
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route path='/' element={<Home />} />
                            <Route path="/pointsTable" element={<PointsTable />} />
                            <Route path="/news" element={<h1>News Coming Soon....</h1>} />
                            <Route path='/matchDetail/:id' element={<MatchDetail />} />
                        </Route>
                    </Routes>
                </div>
            </div>

        </>
    )
}

export default App
