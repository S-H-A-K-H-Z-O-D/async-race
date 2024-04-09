import './App.css'
import Layout from "./components/Layout.tsx";
import Garage from "./components/garage/Garage.tsx";

function App() {

  return (
    <div className="app">
        <Layout>
            <div className="">
                <Garage />
            </div>
        </Layout>
    </div>
  )
}

export default App
