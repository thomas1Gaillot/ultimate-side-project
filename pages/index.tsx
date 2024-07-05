import {TypographyBlockquote, TypographyH2, TypographyP, TypographySmall} from "@/components/ui/typography";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Icon} from "@tabler/icons-react";
import {DribbbleIcon, GithubIcon, LinkedinIcon} from "lucide-react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function Home() {
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)
    return (
        <>
            <section className="my-8">
                <TypographyP>
                    {`Bonjour, je m'appelle Thomas 👋.
                    Je suis un développeur front-end passionné par la création d'expériences fantastiques.`}
                </TypographyP>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={showStatusBar}
                            onCheckedChange={setShowStatusBar}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <TypographyP>
                    <>
                        Bienvenue sur mon site.
                        Découvre <Link className={'hover:underline text-blue-700'} href={'/stack'}>la stack</Link> avec
                        NextJS et shadcn-ui entre autre.
                    </>
                </TypographyP>
                <TypographyP>
                    {` Le but de ce site est également de partager des bonnes pratiques, inspirations et de
                    pouvoir passer un bon moment en faisant évoluer ce site.`}
                </TypographyP>
                <TypographyBlockquote>
                    {`"How to finish a project ? Stop starting new ones." - John Doe, Sept. 2024`}
                </TypographyBlockquote>
            </section>

            <section className="my-8">
                <TypographyH2>Expériences</TypographyH2>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 pt-7'}>
                    <JobCard
                        img={{src: '/enogrid-logo.png', alt: 'enogrid-logo'}}
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