import {useEffect, useState} from "react";
import axios from "axios";
import {Article, articleSchema} from "@/domain/article/Article";
import useArticleStore from "@/domain/article/useArticleStore";

export default function useGetArticle() {
    const {articles, setArticles} = useArticleStore()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        // Fetch articles from the API
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/article');
                const validatedData: Article[] = response.data.map((article:any) => articleSchema.parse(article));
                setArticles(validatedData);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return {articles, isLoading}
}