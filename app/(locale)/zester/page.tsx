import { TypographyH1, TypographyP } from "@/components/ui/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// Image data with specific dimensions
const Images = [
    {
        src: "/zester/snapcarrot.png",
        alt: "zester",
        width: 360,
        height: 477,
    },
    {
        src: "/zester/play.png",
        alt: "play",
        width: 360,
        height: 477,
    },
    {
        src: "/zester/rejoindre.png",
        alt: "join",
        width: 360,
        height: 477,
    },
    {
        src: "/zester/titre.png",
        alt: "titre",
        width: 360,
        height: 477,
    },
    {
        src: "/zester/description.png",
        alt: "description",
        width: 360,
        height: 477,
    },
];

export default function ZesterPage() {
    return (
        <div className={"grid gap-2 w-max-screen w-full"}>
            <TypographyH1>Zester</TypographyH1>
            <Button className={"w-full max-w-lg"} size={"lg"}>
                <a
                    href="https://snapcarrot.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Zester
                </a>
                <ExternalLinkIcon className={"size-5 ml-2"} />
            </Button>
            <TypographyP>
                {"Zester is a mobile-first web application that allows users to create photo contests and vote for their favorite photos." +
                    " The application is built with Next.js, Prisma, Zod, tanStack Query and supabase PostgreSQL and S3 Storage."}
            </TypographyP>
            <Carousel
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent className={"max-w-3xl"}>
                    {Images.map((image, index) => (
                        <CarouselItem key={index} className="basis-auto">
                            <Card className="w-full md:w-[360px] h-auto md:h-[477px]">
                                <CardContent className="flex items-center justify-center p-6">
                                    <Image
                                        key={image.alt}
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width}
                                        height={image.height}
                                        style={{ width: image.width, height: image.height }}
                                        className="w-full h-auto md:w-[360px] md:h-[477px]"
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <TypographyP>
                The application is still a work in progress, but you can check out the
                source code on GitHub.
            </TypographyP>
        </div>
    );
}
