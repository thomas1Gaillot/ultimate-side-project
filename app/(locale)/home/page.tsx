import {TypographyBlockquote, TypographyH2, TypographyP} from "@/components/ui/typography";
import Link from "next/link";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Icon} from "@tabler/icons-react";
import {DribbbleIcon, GithubIcon, LinkedinIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";


export default function Home() {

    return (
        <>
            <section className="my-8">
                <TypographyP>
                    {`Bonjour, je m'appelle Thomas 👋.
                    Je suis un développeur front-end passionné par la création d'expériences fantastiques.`}
                </TypographyP>
                <TypographyP>
                    <>
                        Bienvenue sur mon site.
                    </>
                </TypographyP>
                <TypographyP>
                    <>
                        {`Tu y trouveras `}
                        <Link className={'hover:underline text-primary'} href={'/pomodoro'}>des widgets</Link>
                        {`, jeux et inspirations pour t'aider à rester concentré et productif.`}
                    </>
                </TypographyP>
                <TypographyP>
                    {` Ce site est en construction, n'hésite pas à revenir plus tard pour voir les nouveautés.`}
                </TypographyP>
                <TypographyBlockquote>
                    {`"How to finish a project ? Stop starting new ones." - Jean, Sept. 2024`}
                </TypographyBlockquote>
            </section>

            <section className="my-8">
                <TypographyH2>Expériences</TypographyH2>
                <div className={'grid grid-cols-1 gap-4 pt-7'}>
                    <JobCard
                        img={{src: '/logos/enogrid-logo.png', alt: 'enogrid-logo'}}
                        jobtitle={'Développeur Front-End'}
                        description={'Développeur front-end chez Enogrid, startup tech qui propose des solutions de gestion de l\'énergie. Durée : 4 ans.'}
                        from={'Sept. 2021'}
                        to={'Présent'}
                    />
                </div>
            </section>

            <section className="my-8">
                <TypographyH2>Projets</TypographyH2>
                <TypographyP>
                    <>
                        {`Faits un tour sur  `}
                        <Link className={'hover:underline text-primary'} href={'/roadmap'}>la roadmap</Link>
                        {` pour y trouver ce qui est prévu prochainement.`}
                    </>

                </TypographyP>
            </section>

            <section className="my-8">
                <TypographyH2>Liens</TypographyH2>
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