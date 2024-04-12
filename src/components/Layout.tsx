// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import Button from "./common/Button.tsx";
import logo from "../assets/logo.png"
import {useNavigate} from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    return (
        <div className="px-4 max-w-[1500px] mx-auto" >
            <div className="flex items-center justify-between py-10">
                <div className="flex space-x-4">
                    <Button
                        text={"GARAGE"}
                        className="px-12 tracking-widest py-2"
                        onClick={() => navigate("/")}
                    />
                    <Button
                        text={"WINNERS"}
                        className="px-12 tracking-widest py-2"
                        onClick={() => navigate("/winners")}
                    />
                </div>
                <div>
                    <img width={220} src={logo}/>
                </div>
            </div>
            {children}
        </div>
    )
}
export default Layout