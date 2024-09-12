import { create } from 'zustand'

// Define the store with TypeScript
interface ToggleState {
    consumerView: boolean;
    toggleConsumerView: () => void;
}

export const useConsumerView = create<ToggleState>((set) => ({
    consumerView: false, // initial state
    toggleConsumerView: () => set((state) => ({ consumerView: !state.consumerView })),
}))
