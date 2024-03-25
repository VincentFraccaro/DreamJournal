"use client"

import {useState} from 'react';

import Navbar from "@/app/components/navbar";
import DreamDialog from "@/app/components/dreamDialog";
import {SessionProvider} from "next-auth/react";
import DreamsList from "@/app/components/DreamsList";


export default function Home() {
    const [triggerFetch, setTriggerFetch] = useState(false);

    const handleDreamAdd = () => {
        setTriggerFetch(!triggerFetch);
    }

    return (
        <SessionProvider>
        <Navbar ></Navbar>
        <DreamsList triggerFetch={triggerFetch}></DreamsList>
        <div className={"flex flex-col justify-center items-center"}>
            <DreamDialog onDreamAdded={handleDreamAdd}></DreamDialog>
        </div>
    </SessionProvider>
    )
}

