import { ReactNode } from "react";

class Modul {
    protected id: string;
    protected judul: string;
    protected deskripsi: string;
    protected jumlahSelesai: number;
    protected jumlahPelajaran: number;
    public icon: ReactNode;

    constructor();
    constructor(
        id: string,
        judul: string,
        deskripsi: string,
        jumlahSelesai: number,
        jumlahPelajaran: number,
        icon: ReactNode
    )
    constructor(
        id: string = '',
        judul: string = '',
        deskripsi: string = '',
        jumlahSelesai: number = 0,
        jumlahPelajaran: number = 0,
        icon: ReactNode = null
    ) {
        this.id = id;
        this.judul = judul;
        this.deskripsi = deskripsi;
        this.jumlahSelesai = jumlahSelesai;
        this.jumlahPelajaran = jumlahPelajaran
        this.icon = icon;
    }

    get getId() { return this.id }
    set setId(value: string) { this.id = value }

    get getJudul() { return this.judul }
    set setJudul(value: string) { this.judul = value }

    get getDeskripsi() { return this.deskripsi }
    set setDeskripsi(value: string) { this.deskripsi = value }

    get getJumlahSelesai() { return this.jumlahSelesai }
    set setJumlahSelesai(value: number) { this.jumlahSelesai = value }

    get getJumlahPelajaran() { return this.jumlahPelajaran }
    set setJumlahPelajaran(value: number) { this.jumlahPelajaran = value }
}

export default Modul