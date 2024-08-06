'use client'
import {TypographyH1, TypographyList, TypographyP} from "@/components/ui/typography";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";

const image = {
    src: "/churro-ciao.png",
    alt: "churro-ciao",
    width: 1440,
    height: 3206,
}
export default function ChurroCiaoPage() {
    function openInNewTab() {
        window.open("https://churro-ciao.vercel.app", "_blank");
    }

    return (
        <div className={"grid gap-2 w-max-screen w-full"}>
            <TypographyH1>Churro Ciao</TypographyH1>
            <Button onClick={openInNewTab} className={"w-full max-w-lg"} size={"lg"}>
                Visit Churro Ciao
                <ExternalLinkIcon className={"size-5 ml-2"}/>
            </Button>

            <TypographyP>
                {"Churro Ciao is a cooking static website that I built using Next.js and Tailwind CSS. It is a simple website that sells a restaurant menu. The website is hosted on Vercel."}
            </TypographyP>
            <TypographyP>
                {"Features : "}
            </TypographyP>
            <TypographyList texts={[
                "4 pages : Home, Gallery, Menu, and Contact",
                "SEO",
                "Responsive for mobile and desktop",
                "PWA App",
                "Dark mode",
                "Internationalization",
                "Menu with QR code",
                "Link to socials",
                "Stars on google",
                "MagicUI & Acernity animations"
            ]}/>

            <Card className="w-[300px]">
                <CardContent className="flex items-center justify-center p-0.5">
                    <Image
                        key={image.alt}
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        //style={{ width: image.width, height: image.height }}
                        className="w-full h-auto rounded-lg"
                    />
                </CardContent>
            </Card>

        </div>
    );
}
