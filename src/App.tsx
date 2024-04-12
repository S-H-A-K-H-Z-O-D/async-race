import './App.css'
import Layout from "./components/Layout.tsx";
import Garage from "./components/garage/Garage.tsx";
import {Route, Routes} from "react-router-dom";
import Winners from "./components/winners/Winners.tsx";

function App() {

  return (
    <div className="app">
        <Layout>
            <Routes>
                <Route path="/" element={<Garage />} />
                <Route path="/winners" element={<Winners />} />
            </Routes>
        </Layout>
    </div>
  )
}

export default App
