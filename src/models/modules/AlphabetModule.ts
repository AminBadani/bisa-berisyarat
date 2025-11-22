import { ReactNode } from "react";

import LearningModule from "../LearningModule";
import LearningMaterial from "../LearningMaterial";

class AlphabetModule extends LearningModule {
    constructor(
        id: string = '',
        title: string = '',
        description: string = '',
        materials: LearningMaterial[] = [],
        icon: ReactNode = null
    ) {
        super(id, title, description, materials, icon)
    }
}

export default AlphabetModule