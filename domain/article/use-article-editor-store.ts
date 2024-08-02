import {create} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";


interface PomodoroState {
    article: string;
    setArticle: (article: string) => void;
}

const useArticleEditorStore = create(
    persist(
        (set, get) => ({
            article: '',
            setArticle: (article: string) => set({article}),
        }),
        {
            name: 'article-preview-store', // unique name for the storage,
        } as PersistOptions<PomodoroState> // Type assertion for PersistOptions
    )
);

export default useArticleEditorStore;




