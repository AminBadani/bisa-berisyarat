/**
 * Merepresentasikan soal yang akan dikejakan dalam bentuk pilihan ganda,
 * berisi id, tipe, isi soal, pilihan jawaban, dan pilihan yang benar
 */
class Soal {
    protected _id: number;
    protected _type: string;
    protected _question: string;
    protected _description: string;
    protected _options: any[];
    protected _correctAnswer: number;

    /**
     * 
     * @param id - nilai unik dari soal (dalam bentuk angka), misal 1, 2, 10
     * @param type - tipe dari soal, ada 2 tipe: 'choose-letter' atau 'choose-image'
     * @param question - isi dari pertanyaan, bisa berupa huruf atau lokasi file foto
     * @param description - deskripsi untuk menjelaskan hal yang harus dilakukan
     * @param options - pilihan jawaban yang bisa dipilih
     * @param answer - pilihan jawaban benar (dalam bentuk angka index)
     */
    constructor(
        id: number,
        type: string,
        question: string,
        description: string,
        options: any[],
        answer: number
    ) {
        this._id = id;
        this._type = type;
        this._question = question;
        this._description = description;
        this._options = options;
        this._correctAnswer = answer;
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

    get correctAnswer() { return this._correctAnswer }
    set correctAnswer(value: number) { this._correctAnswer = value }
}

export default Soal;