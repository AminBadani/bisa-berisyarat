import { ReactNode } from "react";

import LearningModule from "../LearningModule";
import LearningMaterial from "../LearningMaterial";

/**
 * Subclass (kelas turunan) dari learningModule khusus untuk module belajar huruf
 */
class AlphabetModule extends LearningModule {

    /**
     * @param title - judul dari modul
     * @param description - deskripsi yang menjelaskan modul
     * @param materials - list materi yang ada di dalam modul untuk dipelajari
     * @param icon - komponen React sebagai icon ketika di render
     */
    constructor(
        title: string = '',
        description: string = '',
        materials: LearningMaterial[] = [],
        icon: ReactNode = null
    ) {
        super('letter', title, description, materials, icon)
    }
}

export default AlphabetModule