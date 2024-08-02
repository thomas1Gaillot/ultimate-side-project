import "@/app/(locale)/styles/globals.css";
import Sidebar from "@/app/(locale)/components/Sidebar";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
import {Metadata} from "next";
import MainLayout from "@/app/(locale)/main-layout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
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
                className={`${inter.className}`}>
            <Sidebar/>
            <MainLayout>
                {children}
            </MainLayout>
            <Toaster/>
            </body>

            </html>
        </>
    );
}
