export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"mx-auto w-full h-full max-w-3xl px-4 py-12 pb-10 md:px-8"}>
            {children}
        </div>
    );
}
