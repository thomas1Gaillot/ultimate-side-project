import { create } from 'zustand'

// Define the store with TypeScript
interface ToggleState {
    showV1: boolean;
    toggleShowV1: () => void;
}

export const useToggleV1 = create<ToggleState>((set) => ({
    showV1: false, // initial state
    toggleShowV1: () => set((state) => ({ showV1: !state.showV1 })),
}))
