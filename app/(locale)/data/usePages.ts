import {
    BlocksIcon, BookOpenTextIcon, CarrotIcon,
    ConstructionIcon,
    CroissantIcon,
    HomeIcon,
    JoystickIcon,
    Layers2Icon,
    LoaderCircle,
    MusicIcon, NotebookPenIcon,
    Play,
    StarIcon,
    TimerIcon
} from "lucide-react";
import {useEffect, useState} from "react";
import usePomodoroStore from "@/domain/pomodoro/use-pomodoro-store";

const defaultPages = [
    {
        section: '',
        pages: [
            {
                href: '/home',
                label: 'Home',
                icon: HomeIcon,
                newTab: false
            },
            {
                href: '/writing',
                label: 'Writing ',
                icon: BookOpenTextIcon,
                newTab: false
            },
            {
                href: '/roadmap',
                label: 'Roadmap',
                icon: ConstructionIcon,
                newTab: false
            }, {
                href: '/stack',
                label: 'Stack',
                icon: BlocksIcon,
                newTab: false
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
                newTab: false
            },{
                href: '/article-editor',
                label: 'Article Editor',
                icon: NotebookPenIcon,
                newTab: false
            }
        ]
    },
    {
        section: 'Projects',
        pages: [
            {
                href: 'https://snapcarrot.vercel.app',
                label: 'SnapCarrot',
                icon: CarrotIcon,
                newTab: true
            }
        ]
    }
]
export const usePages = () => {
    const [pages, setPages] = useState(defaultPages);
    const {tasks, isPlaying} = usePomodoroStore();
    useEffect(() => {
        const newPages = pages.map((page) => {
            if (page.section === 'Widgets') {
                return {
                    ...page,
                    pages: page.pages.map((widget) => {
                        if (widget.label.includes('Pomodoro')) {
                            return {
                                ...widget,
                                label: `Pomodoro ${tasks.length === 0 ? '' : ' - ' + tasks.length}`,
                                icon: tasks.length > 0 ? (isPlaying ? LoaderCircle : Play) : TimerIcon
                            }
                        }
                        return widget
                    })
                }
            }
            return page
        })
        setPages(newPages)
    }, [tasks, isPlaying]);
    return pages
}