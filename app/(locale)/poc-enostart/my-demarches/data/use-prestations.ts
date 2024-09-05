'use client'
import { create } from "zustand";

interface Prestations {
    pmoDemarches: 'active' | 'disabled' | null;
    enedisDemarches: 'active' | 'disabled' | null;
    salesDemarches: 'active' | 'disabled' | null;
    setPmoDemarches: (status: 'active' | 'disabled' | null) => void;
    setEnedisDemarches: (status: 'active' | 'disabled' | null) => void;
    setSalesDemarches: (status: 'active' | 'disabled' | null) => void;
}

export const useStoredPrestations = create<Prestations>((set) => ({
    pmoDemarches: null,
    enedisDemarches: null,
    salesDemarches: null,
    setPmoDemarches: (status) => set(() => ({ pmoDemarches: status })),
    setEnedisDemarches: (status) => set(() => ({ enedisDemarches: status })),
    setSalesDemarches: (status) => set(() => ({ salesDemarches: status })),
}));


function usePrestations() {
    const { pmoDemarches, enedisDemarches, salesDemarches } = useStoredPrestations();

    const isPmoActive = pmoDemarches === 'active';
    const isEnedisActive = enedisDemarches === 'active';
    const isSalesActive = salesDemarches === 'active';
    const hasDisabled = pmoDemarches === 'disabled' || enedisDemarches === 'disabled' || salesDemarches === 'disabled';
    return {
        pmoDemarches,
        enedisDemarches,
        salesDemarches,
        isPmoActive,
        isEnedisActive,
        isSalesActive,
        hasDisabled
    };
}

export { usePrestations };