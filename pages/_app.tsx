import "./styles/globals.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
import Sidebar from "@/pages/components/Sidebar";
import RootLayout from "@/pages/layout";

const inter = Inter({subsets: ["latin"]});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Thomas Gaillot</title>
                <meta name="description" content="Building Things front-end side"/>
                <link rel="icon" href="/avocado.ico" />
            </Head>
            <div className={`${inter.className} relative flex flex-col md:flex-row h-screen max-h-screen overflow-hidden w-full`}>
                <Sidebar/>
                <div className={"overflow-y-auto w-full"}>
                    <RootLayout>
                    <Component {...pageProps} />
                    </RootLayout>
                </div>
            </div>
            <Toaster/>
        </>
    );
}

export default MyApp;
