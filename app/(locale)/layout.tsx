import Head from "next/head";
import "@/app/(locale)/styles/globals.css";
import Sidebar from "@/app/(locale)/components/Sidebar";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
const inter = Inter({subsets: ["latin"]});
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <Head>
            <title>Thomas Gaillot</title>
            <meta name="description" content="Building Things front-end side"/>
            <link rel="icon" href="/avocado.ico"/>
        </Head>
        <html>
        <body
            className={`${inter.className} relative flex flex-col md:flex-row h-screen max-h-screen overflow-hidden w-full`}>
            <Sidebar/>
            <div className={"overflow-y-auto  mx-auto w-full h-full max-w-3xl px-4 py-12 pb-10 md:px-8"}>
                {children}
            </div>
            <Toaster/>
        </body>

        </html>
    </>
    );
}
