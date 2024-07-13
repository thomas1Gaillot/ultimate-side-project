import {howToGuide} from "@/app/(locale)/article-editor/data/how-to-guide";
import {caseStudy} from "@/app/(locale)/article-editor/data/case-study";
import {opinionPiece} from "@/app/(locale)/article-editor/data/opinion-piece";
import {comparisonArticle} from "@/app/(locale)/article-editor/data/comparison-article";
import {FlaskConicalIcon, LightbulbIcon, LucideProps, MessageCircleIcon, ScaleIcon} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export interface Article {
    id: string
    name: string
    href: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    md: string
    updatedAt?: string
}

export const presetArticles: Article[] = [
    {
        id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
        name: "How-to Guide",
        href: "how-to-guide",
        md: howToGuide,
        icon: MessageCircleIcon,
        updatedAt: "2024-07-13"
    },
    {
        id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
        name: "Case Study",
        href: "case-study",
        md: caseStudy,
        icon: FlaskConicalIcon,
        updatedAt: "2024-07-13"

    },
    {
        id: "cc198b13-4933-43aa-977e-dcd95fa30770",
        name: "Opinion Piece",
        href: "opinion-piece",
        md: opinionPiece,
        icon: LightbulbIcon,
        updatedAt: "2024-07-13"


    },
    {
        id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
        name: "Comparison Article",
        href: "comparison-article",
        md: comparisonArticle,
        icon: ScaleIcon,
        updatedAt: "2024-07-13"
    }
]