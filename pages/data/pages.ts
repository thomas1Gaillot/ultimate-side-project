import {
    ArchiveIcon,
    BlocksIcon,
    CroissantIcon,
    HomeIcon,
    JoystickIcon,
    Layers2Icon,
    MusicIcon,
    StarIcon,
    TimerIcon
} from "lucide-react";

export const  pages = [
    {
        section: '',
        pages: [
            {
                href: '/',
                label: 'Home',
                icon: HomeIcon,
            }, {
                href: '/stack',
                label: 'Stack',
                icon: BlocksIcon,
            },
            {
                href: '/inspiration',
                label: 'Inspiration',
                icon: StarIcon,
            },
        ]
    },
    {
        section: 'Widgets',
        pages: [
            {
                href: '/pomodoro',
                label: 'Pomodoro',
                icon: TimerIcon,
            }, {
                href: '/croissant',
                label: 'Croissant',
                icon: CroissantIcon,
            },{
                href: '/spotify',
                label: 'Spotify',
                icon: MusicIcon,
            },
        ]
    },
    {
        section: 'Projects',
        pages: [
            {
                href: '/ux-games',
                label: 'UX Games',
                icon: JoystickIcon,
            }, {
                href: '/site-reproduction',
                label: 'Site reproduction',
                icon: Layers2Icon,
            },
        ]
    },
    {
        section: 'Legacy',
        pages: [
            {
                href: '/form-made-with-zod',
                label: 'Forms with Zod',
                icon: ArchiveIcon,
            }, {
                href: '/old-homepage',
                label: 'old homepage',
                icon: ArchiveIcon,
            },
        ]
    }
]