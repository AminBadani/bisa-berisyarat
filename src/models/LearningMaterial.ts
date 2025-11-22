class LearningMaterial {
    protected _id: string;
    protected _description: string;
    protected _isLearned: boolean = false;
    protected _image: string;
    protected _sound: string;

    constructor(
        id: string = '',
        description: string = '',
        isFinished: boolean = false,
        image: string = '',
        sound: string = '',
    ) {
        this._id = id;
        this._description = description;
        this._isLearned = isFinished;
        this._image = image;
        this._sound = sound;
    }

    get id() { return this._id }
    set id(value: string) { this._id = value }

    get description() { return this._description }
    set description(value: string) { this._description = value }

    get image() { return this._image }
    set image(value: string) { this._image = value }

    get sound() { return this._sound }
    set sound(value: string) { this._sound = value }

    get isLearned() { return this._isLearned }
    set isLearned(value: boolean) { this._isLearned = value }

    changeFinished(key: string, value: boolean) {
        this._isLearned = value;
        window.api.addFinished(key, this._id);
    }

    clone(): LearningMaterial {
        return new LearningMaterial(
            this._id,
            this._description,
            this._isLearned,
            this._image,
            this._sound
        )
    }
}

export default LearningMaterial