class Soal {
    protected id: string;
    protected tipe: string;
    protected soal: string;
    protected gambar: string;
    protected audio: string;
    protected opsi: [];
    protected jawabanBenar: [];

    constructor();
    constructor(
        id: string,
        tipe: string,
        soal: string,
        gambar: string,
        audio: string,
        opsi: [],
        jawabanBenar: []
    )
    constructor(
        id: string = '',
        tipe: string = '',
        soal: string = '',
        gambar: string = '',
        audio: string = '',
        opsi: [] = [],
        jawabanBenar: [] = []
    ) {
        this.id = id;
        this.tipe = tipe;
        this.soal = soal;
        this.gambar = gambar;
        this.audio = audio;
        this.opsi = opsi;
        this.jawabanBenar = jawabanBenar;
    }
}

export default Soal;