class Materi {
    protected id: string;
    protected deskripsi: string;
    protected selesai: boolean = false;
    protected gambar: string;
    protected suara: string;

    constructor();
    constructor(
        id: string,
        deskripsi: string,
        selesai: boolean,
        gambar: string,
        suara: string,
    )
    constructor(
        id: string = '',
        deskripsi: string = '',
        selesai: boolean = false,
        gambar: string = '',
        suara: string = '',
    ) {
        this.id = id;
        this.deskripsi = deskripsi;
        this.selesai = selesai;
        this.gambar = gambar;
        this.suara = suara;
    }

    get getId() { return this.id }
    set setId(value: string) { this.id = value }

    get getDeskripsi() { return this.deskripsi }
    set setDeskripsi(value: string) { this.deskripsi = value }

    get getGambar() { return this.gambar }
    set setGambar(value: string) { this.gambar = value }

    get getSuara() { return this.suara }
    set setSuara(value: string) { this.suara = value }

    get getSelesai() { return this.selesai }
    set setSelesai(value: boolean) { this.selesai = value }

    ubahSelesai(key: string, value: boolean) {
        this.selesai = value;
        window.api.addFinished(key, this.id);
    }
}

export default Materi