import { ReactNode } from "react";

import LearningMaterial from "./LearningMaterial";

class LearningModule {
    protected _id: string;
    protected _title: string;
    protected _description: string;
    public materials: LearningMaterial[];

    protected _countFinished: number;
    protected _countMaterials: number
    public icon: ReactNode;

    constructor(
        id: string = '',
        title: string = '',
        description: string = '',
        materials: LearningMaterial[] = [],
        icon: ReactNode = null
    ) {
        this._id = id;
        this._title = title;
        this._description = description;
        this.materials = materials;

        this._countFinished = materials.filter(material => material.isLearned == true).length;
        this._countMaterials = materials.length
        this.icon = icon;
    }

    get id() { return this._id }
    set id(value: string) { this._id = value }

    get title() { return this._title }
    set title(value: string) { this._title = value }

    get description() { return this._description }
    set description(value: string) { this._description = value }

    get countFinished() { return this.materials.filter(material => material.isLearned == true).length }
    set countFinished(value: number) { this._countFinished = value }

    get countMaterials() { return this._countMaterials }
    set countMaterials(value: number) { this._countMaterials = value }

    clone(): LearningModule {
        const clonedMaterials = this.materials.map(m => m.clone());
        return new LearningModule(
            this._id, 
            this._title, 
            this._description, 
            clonedMaterials, 
            this.icon
        )
    }
}

export default LearningModule