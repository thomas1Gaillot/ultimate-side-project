import "./styles/globals.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
import Sidebar from "@/pages/components/Sidebar";

const inter = Inter({subsets: ["latin"]});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>In construction ...</title>
                <meta name="description" content="Building Things front-end side"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={`${inter.className} relative flex h-screen max-h-screen overflow-hidden w-full`}>
                <Sidebar/>
                <div className={"overflow-y-auto w-full"}>
                    <Component {...pageProps} />
                </div>
            </div>
            <Toaster/>
        </>
    );
}

export default MyApp;
