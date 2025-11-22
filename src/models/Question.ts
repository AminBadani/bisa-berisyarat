class Soal {
    protected _id: number;
    protected _type: string;
    protected _question: string;
    protected _description: string;
    protected _options: any[];
    protected _answer: number;

    constructor(
        id: number = 0,
        type: string = '',
        question: string = '',
        description: string = '',
        options: any[] = [],
        answer: number = -1,
    ) {
        this._id = id;
        this._type = type;
        this._question = question;
        this._description = description;
        this._options = options;
        this._answer = answer;
    }

    get id() { return this._id }
    set id(value: number) { this._id = value }

    get type() { return this._type }
    set type(value: string) { this._type = value }
    
    get question() { return this._question }
    set question(value: string) { this._question = value }
    
    get description() { return this._description }
    set description(value: string) { this._description = value }

    get options(): any[] { return this._options }
    set options(value: []) { this._options = value }

    get answer() { return this._answer }
    set answer(value: number) { this._answer = value }
}

export default Soal;