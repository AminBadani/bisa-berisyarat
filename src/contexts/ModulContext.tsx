import { createContext, useContext } from "react";
import Modul from "../models/Modul";

type ModulCtx = {
    listModul: Modul[];
    setListModul: React.Dispatch<React.SetStateAction<Modul[]>>;
};

export const ModulContext = createContext<ModulCtx>({
    listModul: [],
    setListModul: () => { },
});

export const useListModul = () => useContext(ModulContext);