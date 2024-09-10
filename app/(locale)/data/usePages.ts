import {
    BlocksIcon,
    BookOpenTextIcon,
    CarrotIcon,
    ChefHatIcon, CircleDotDashed,
    ConstructionIcon,
    HomeIcon,
    LoaderCircle,
    NotebookPenIcon,
    Play,
    TimerIcon
} from "lucide-react";
import {useEffect, useState} from "react";
import usePomodoroStore from "@/domain/pomodoro/stores";

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
            }, {
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
                href: '/zester',
                label: 'Zester',
                icon: CarrotIcon,
                newTab: false
            },
            {
                href: '/churro-ciao',
                label: 'Churro Ciao',
                icon: ChefHatIcon,
                newTab: false
            },
            {
                href: '/poc-enostart/my-project',
                label: 'PoC',
                icon: CircleDotDashed,
                newTab: false
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
