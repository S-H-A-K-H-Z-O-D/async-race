import React from "react";
import Button from "./common/Button.tsx";
import logo from "../assets/logo.png"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-48" >
            <div className="flex items-center justify-between py-10">
                <div className="flex flex-col space-y-3">
                    <Button text={"GARAGE"}/>
                    <Button text={"WINNERS"}/>
                </div>
                <div>
                    <img src={logo}/>
                </div>
            </div>
            {children}
        </div>
    )
}
export default Layout