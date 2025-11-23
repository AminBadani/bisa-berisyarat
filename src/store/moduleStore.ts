import { create } from "zustand";
import LearningModule from "../models/LearningModule";

interface ModulState {
    modules: LearningModule[];

    setModules: (mods: LearningModule[]) => void;

    // optional helpers
    updateModule: (id: string, updated: LearningModule) => void;
    addModule: (mod: LearningModule) => void;
}

export const useModuleStore = create<ModulState>((set) => ({
    modules: [],

    setModules: (mods) => set({ modules: mods }),

    updateModule: (id: string, updated: LearningModule) =>
        set((state) => {
            const newList = state.modules.map((m) =>
                m.id === id ? updated : m
            );
            return { modules: newList };
        }),

    addModule: (mod) =>
        set((state) => ({
            modules: [...state.modules, mod],
        })),
}));
