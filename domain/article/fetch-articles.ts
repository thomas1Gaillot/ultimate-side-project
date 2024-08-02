import axios from "axios";
import {Article, articleSchema} from "@/domain/article/Article";

const fetchArticles = async () => {
    try {
        const response = await axios.get('/api/article');
        const validatedData: Article[] = response.data.map((article:any) => articleSchema.parse(article));
        return validatedData
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

export {fetchArticles}