import "@/app/(locale)/styles/globals.css";
import Sidebar from "@/app/(locale)/components/Sidebar";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
import {Metadata} from "next";

const inter = Inter({subsets: ["latin"]});

export const metadata:Metadata = {
    title: "Thomas Gaillot",
    description: "Building Things front-end side",
    icons: {
        icon: "/avocado.ico",
    },
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <html>
        <body
            className={`${inter.className} relative flex flex-col md:flex-row h-screen max-h-screen overflow-hidden w-full`}>
            <Sidebar/>
            <div className={"overflow-y-auto   w-full h-full  px-4 py-12 pb-10 md:px-8"}>
                <div className={"max-w-5xl mx-auto"}>
                    {children}
                </div>
            </div>
            <Toaster/>
        </body>

        </html>
    </>
    );
}
