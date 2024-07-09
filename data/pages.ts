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
import {useEffect, useState} from "react";
import usePomodoroStore from "@/hooks/usePomodoroStore";

const defaultPages  = [
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
                label: 'Inspiration (WIP)',
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
                label: 'Croissant (WIP)',
                icon: CroissantIcon,
            },{
                href: '/spotify',
                label: 'Spotify (WIP)',
                icon: MusicIcon,
            },
        ]
    },
    {
        section: 'Projects',
        pages: [
            {
                href: '/ux-games',
                label: 'UX Games (WIP)',
                icon: JoystickIcon,
            }, {
                href: '/site-reproduction',
                label: 'Site reproduction (WIP)',
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
export const usePages = () => {
    const [pages, setPages] = useState(defaultPages);
    const {tasks} = usePomodoroStore();
    useEffect(() => {
        if(tasks.length >0) {
            const newPages = pages.map((page) => {
                if(page.section === 'Widgets') {
                    return {
                        ...page,
                        pages: page.pages.map((widget) => {
                            if(widget.label.includes('Pomodoro')) {
                                return {
                                    ...widget,
                                    label: `Pomodoro (${tasks.length})`
                                }
                            }
                            return widget
                        })
                    }
                }
                return page
            })
            console.log(tasks.length, newPages)
            setPages(newPages)
        }
    }, [tasks]);
    return pages
}