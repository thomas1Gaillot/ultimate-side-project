import {TypographyBlockquote, TypographyH2, TypographyP, TypographySmall} from "@/components/ui/typography";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Icon} from "@tabler/icons-react";
import {DribbbleIcon, GithubIcon, LinkedinIcon} from "lucide-react";


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
                        <Link className={'hover:underline text-indigo-700'} href={'/pomodoro'}>des widgets</Link>
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
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 pt-7'}>
                    <JobCard
                        img={{src: '/logos/enogrid-logo.png', alt: 'enogrid-logo'}}
                        jobtitle={'Développeur Front-End'}
                        company={'Enogrid'}
                        from={'Sept. 2021'}
                        to={'Présent'}
                    />
                </div>
            </section>

            <section className="my-8">
                <TypographyH2>Projets</TypographyH2>
                <TypographyP>
                    Au boulot !
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
const JobCard = ({img, company, jobtitle, from, to}: {
    img: {
        src: string,
        alt: string,
    },
    company: string,
    jobtitle: string,
    from: string,
    to: string

}) => {
    return <Card className={'p-4 space-y-4'}>
        <div className={'flex items-center gap-4'}>
            <div className={"rounded-full bg-gray-100 min-w-[62px] min-h-[62px] flex items-center justify-center"}>
                <Image src={img.src} alt={img.alt}
                       width={48} height={48}
                />
            </div>
            <div className={'flex flex-col'}>
                <p className={'text-gray-700 font-semibold'}>{jobtitle}</p>
                <p className={'text-gray-700'}>
                    {company}
                </p>
            </div>
        </div>
        <TypographySmall>{`${from} - ${to}`}</TypographySmall>
    </Card>
}