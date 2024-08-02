'use client'
import {TypographyBlockquote, TypographyH4, TypographyP} from "@/components/ui/typography";
import Link from "next/link";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Icon} from "@tabler/icons-react";
import {DribbbleIcon, GithubIcon, LinkedinIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {fetchLastSelectedRoadmap} from "@/domain/roadmap/use-fetch-last-selected-roadmap";
import UpcomingProjectCard, {UpcomingProjectCardSkeleton} from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {useQuery} from "@tanstack/react-query";
import {Roadmap} from "@/domain/roadmap/Roadmap";


export default function Home() {
    const {data: lastSelectedRoadmap, error, isLoading} = useQuery<Roadmap, Error>({
        queryKey: ["roadmaps", "last-selected"],
        queryFn: fetchLastSelectedRoadmap,
        refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    });


    return (
        <>
            <section className="my-8">
                <TypographyP>
                    {`Hello, my name is Thomas 👋. I am a front-end developer.`}
                </TypographyP>
                <TypographyP>
                    <>
                        Welcome to my site.
                    </>
                </TypographyP>
                <TypographyP>
                    <>
                        {`You will find `}
                        <Link className={'hover:underline text-primary'} href={'/pomodoro'}>widgets</Link>
                        {`, games, and inspirations to help you stay focused and productive.`}
                    </>
                </TypographyP>
                <TypographyP>
                    {`This site is under construction, feel free to come back later to see the updates.`}
                </TypographyP>
                <TypographyBlockquote>
                    {`"How to finish a project? Stop starting new ones." - Jean, Sept. 2024`}
                </TypographyBlockquote>
            </section>

            <section className="my-8">
                <TypographyH4>Experience</TypographyH4>
                <div className={'grid grid-cols-1 gap-4 pt-7'}>
                    <JobCard
                        img={{src: '/logos/enogrid-logo.png', alt: 'enogrid-logo'}}
                        jobtitle={'Front-End Developer'}
                        description={'Front-end developer at Enogrid, a tech startup offering energy management solutions. Duration: 4 years.'}
                        from={'Sept. 2021'}
                        to={'Present'}
                    />
                </div>
            </section>

            <section className="my-8 space-y-4">
                <TypographyH4>Current Project</TypographyH4>
                <TypographyP>
                    <>
                        {`Take a look at  `}
                        <Link className={'hover:underline text-primary'} href={'/roadmap'}>the roadmap</Link>
                        {` to see what is planned next.`}
                    </>
                </TypographyP>
                {error && <pre className={"text-xs"}>{JSON.stringify(error)}</pre>}
                {lastSelectedRoadmap && !error && <UpcomingProjectCard {...lastSelectedRoadmap} />}
                {isLoading && <UpcomingProjectCardSkeleton/>}
            </section>

            <section className="my-8">
                <TypographyH4>Links</TypographyH4>
                <div className={"flex flex-wrap gap-4 pt-7"}>
                    <LinkToSocial Icon={GithubIcon} href={'https://github.com/thomas1Gaillot'}/>
                    <LinkToSocial Icon={LinkedinIcon} href={'https://www.linkedin.com/in/thomasgaillot/'}/>
                    <LinkToSocial Icon={DribbbleIcon} href={'https://dribbble.com/thomasgaillot'}/>
                </div>
            </section>
        </>
    );
}

const LinkToSocial = ({href, Icon}: { href: string, Icon: any }) => {
    return <Link target={'_blank'} href={href}>
        <div className={"w-12 h-12 shadow-md rounded-md flex justify-center items-center hover:bg-gray-100"}>
            <Icon className={"h-5 w-5 text-gray-700"}/>
        </div>
    </Link>
}

const JobCard = ({img, description, jobtitle, from, to}: {
    img: {
        src: string,
        alt: string,
    },
    description: string,
    jobtitle: string,
    from: string,
    to: string

}) => {
    return <Card className="w-full max-w-xl ">
        <CardHeader>
            <CardTitle className="flex flex-col gap-2">
                <Badge variant="secondary" className="w-max">{from} - {to}</Badge>
                <span className="text-xl font-semibold text-gray-800">{jobtitle}</span>
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <Image src={img.src} alt={img.alt} width={60} height={60}/>
        </CardFooter>
    </Card>
}
