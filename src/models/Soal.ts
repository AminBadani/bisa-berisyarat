class Soal {
    protected id: number;
    protected tipe: string;
    protected soal: string;
    protected deskripsi: string;
    protected opsi: any[];
    protected jawabanBenar: number;

    constructor();
    constructor(
        id: number,
        tipe: string,
        soal: string,
        deskripsi: string,
        opsi: any[],
        jawabanBenar: number
    )
    constructor(
        id: number = 0,
        tipe: string = '',
        soal: string = '',
        deskripsi: string = '',
        opsi: any[] = [],
        jawabanBenar: number = -1,
    ) {
        this.id = id;
        this.tipe = tipe;
        this.soal = soal;
        this.deskripsi = deskripsi;
        this.opsi = opsi;
        this.jawabanBenar = jawabanBenar;
    }

    get getId() { return this.id }
    set setId(value: number) { this.id = value }

    get getTipe() { return this.tipe }
    set setTipe(value: string) { this.tipe = value }
    
    get getSoal() { return this.soal }
    set setSoal(value: string) { this.soal = value }
    
    get getDeskripsi() { return this.deskripsi }
    set setDeskripsi(value: string) { this.deskripsi = value }

    get getOpsi() { return this.opsi }
    set setOpsi(value: []) { this.opsi = value }

    get getJawabanBenar() { return this.jawabanBenar }
    set setJawabanBenar(value: number) { this.jawabanBenar = value }
}

export default Soal;