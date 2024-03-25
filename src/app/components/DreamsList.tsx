// src/app/components/DreamsList.tsx
import { useEffect, useState } from 'react';
import { Dreams } from "@/app/db/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const DreamsList = ({triggerFetch = false}) => {
    const [dreams, setDreams] = useState<Dreams[]>([]);
    const { data: session, status } = useSession(); // Use status to check if loading is done

    useEffect(() => {
        // Define the async function inside useEffect
        const getDreams = async () => {
            try {
                const response = await fetch('/api/dreams', {
                    method: 'get',
                    credentials: 'include',
                }); // Use relative URL for portability
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setDreams(data);
            } catch (error) {
                console.error("Failed to fetch dreams:", error);
            }
        };

        // Check if the session exists and is not in a loading state
        if (session && status === 'authenticated') {
            getDreams();
        }
    }, [session, status, triggerFetch]); // Depend on session and status to re-run when they change

    // Function to delete a dream
    const deleteDream = async (id: number) => {
        try {
            const response = await fetch(`/api/dreams/${id}`, {
                method: 'DELETE', // Use uppercase HTTP methods
            });
            if (!response.ok) throw new Error("Failed to delete");
            const data = await response.json();
            console.log(data);

            // Optimistically remove the dream from UI
            setDreams(dreams.filter(dream => dream.id !== id));
        } catch (error) {
            console.error("Failed to delete dream:", error);
        }
    };

    return (
        <div className="content-center items-center md:flex md:flex-col space-y-2">
            {session && dreams.map(dream => (
                <div key={dream.id} className="border rounded-lg p-4 shadow-md bg-white bg-opacity-50 sm:w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2">
                    <h3 className="text-xl font-medium leading-tight mb-2">{dream.title}</h3>
                    <p className="text-lg mb-4">{dream.content}</p>
                    <div>
                        <span>Lucid Dream</span>
                        <Checkbox checked={dream.isLucid || false}/>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button variant="destructive" onClick={() => deleteDream(dream.id)}>
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DreamsList;
