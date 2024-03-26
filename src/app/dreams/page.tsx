"use client"

import Head from 'next/head';
import Navbar from "@/app/components/navbar";
import {SessionProvider} from "next-auth/react";

export default function DreamsPage() {
    return (
        <SessionProvider>
        <div className="min-h-screen lg:px-20">
            <Navbar className={"py-2"}></Navbar>
            <Head>
                <title>About Dreams</title>
            </Head>

            <main className="border rounded-lg p-4 shadow-md bg-white bg-opacity-50 sm:w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 mx-auto p-5">
                <h1 className="text-4xl font-bold text-center mb-12">Understanding Dreams</h1>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Introduction to Dreams</h2>
                    <p className="text-lg mb-3">
                        Dreams are a gateway to the subconscious mind. Throughout history, dreams have been revered as
                        sources of inspiration, insight, and prophecy. Our dream journaling platform is designed to help
                        you discover the hidden messages in your dreams and explore the wonders of your sleeping mind.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">What Are Dream Cycles?</h2>
                    <p className="text-lg mb-3">
                        The sleep cycle consists of five stages, including Rapid Eye Movement (REM) and non-REM sleep.
                        While dreams can occur at any stage, they are most prominent and memorable during REM sleep.
                        Each cycle lasts about 90 minutes, and the sequence repeats several times   throughout the
                        night. </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Understanding REM Sleep</h2>
                    <p className="text-lg mb-3">
                        REM sleep is characterized by increased brain activity, rapid eye movement, and temporary muscle
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        paralysis. It's in this stage that dreams are vivid and often remembered upon waking. REM is
                        crucial for cognitive functions such as memory consolidation and mood regulation. </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Lucid Dreaming</h2>
                    <p className="text-lg mb-3">
                        Lucid dreaming is a phenomenon where the dreamer gains awareness within the dream and may even
                        learn to control the narrative. It opens up possibilities for adventure, creativity, and
                        personal growth within the dream world. </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">How Lucid Dreaming Occurs</h2>
                    <p className="text-lg mb-3">
                        Lucid dreams often occur spontaneously but can be encouraged through various practices. They are
                        more likely to happen during periods of heightened self-awareness or when the dreamer questions
                        their reality within the dream. </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Tips for Achieving Lucidity</h2>
                    <ul className="list-disc list-inside space-y-2">
                        To increase the likelihood of lucid dreaming, consider the following strategies:

                        Maintain a regular sleep schedule to improve dream recall.
                        Keep a dream journal to recognize patterns and triggers.
                        Perform reality checks throughout the day to cultivate awareness.
                        Practice mindfulness and meditation to enhance self-awareness.
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Dream Journaling and Its Benefits</h2>
                    <p className="text-lg mb-3">
                        Documenting your dreams in a journal is a potent tool for self-discovery. It can help you
                        identify recurring themes, increase the frequency of lucid dreams, and potentially lead to
                        greater mental and emotional clarity. </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-5">Conclusion</h2>
                    <p className="text-lg mb-3">
                        Dreams can be a source of profound insight and joy. As you embark on this journey of
                        exploration, remember that every dream offers an opportunity for reflection and growth. Join our
                        community of dreamers and start uncovering the mysteries of your sleep tonight. </p>
                </section>
            </main>
        </div>
        </SessionProvider>
    );
}