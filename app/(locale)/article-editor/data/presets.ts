import {howToGuide} from "@/app/(locale)/article-editor/data/how-to-guide";
import {caseStudy} from "@/app/(locale)/article-editor/data/case-study";
import {opinionPiece} from "@/app/(locale)/article-editor/data/opinion-piece";
import {comparisonArticle} from "@/app/(locale)/article-editor/data/comparison-article";

export interface Preset {
    id: string
    name: string
    md: string
}

export const presets: Preset[] = [
    {
        id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
        name: "How-to Guide",
        md: howToGuide
    },
    {
        id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
        name: "Case Study",
        md: caseStudy
    },
    {
        id: "cc198b13-4933-43aa-977e-dcd95fa30770",
        name: "Opinion Piece",
        md: opinionPiece
    },
    {
        id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
        name: "Comparison Article",
        md: comparisonArticle
    },


]