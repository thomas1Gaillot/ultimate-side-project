import {create} from "zustand";
import {initialParticipants} from "@/app/(locale)/poc-enostart/data-refactored/participant/data";
import {Participant} from "@/app/(locale)/poc-enostart/data-refactored/participant/participant";

interface ParticipantsStore {
    participants: Participant[];
    setParticipants: (participants: Participant[]) => void;
}

export const useStoredParticipants = create<ParticipantsStore>((set) => ({
    participants: initialParticipants,
    setParticipants: (participants: Participant[]) => {
        set({participants});
    },
}));