import {howToGuide} from "@/app/(locale)/article-editor/data/how-to-guide";
import {resourceList} from "@/app/(locale)/article-editor/data/resource-list";
import {caseStudy} from "@/app/(locale)/article-editor/data/case-study";
import {opinionPiece} from "@/app/(locale)/article-editor/data/opinion-piece";
import {interview} from "@/app/(locale)/article-editor/data/interview";
import {comparisonArticle} from "@/app/(locale)/article-editor/data/comparison-article";
import {productReview} from "@/app/(locale)/article-editor/data/product-review";

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
        id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
        name: "Resource List",
        md: resourceList
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
        id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
        name: "Interview",
        md: interview
    },
    {
        id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
        name: "Comparison Article",
        md: comparisonArticle
    },
    {
        id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
        name: "Product/Service Review",
        md: productReview
    },

]