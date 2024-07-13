import {Article} from "@/domain/article/Article";
import {create} from "zustand";

interface ArticleState {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
}

const useArticleStore = create<ArticleState>((set) => ({
    articles: [],
    setArticles: (articles: Article[]) => set({articles}),
}));
export default useArticleStore;
