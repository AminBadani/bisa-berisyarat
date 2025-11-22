import { ReactNode } from "react";
import Materi from "./Materi";

class Modul {
    protected id: string;
    protected judul: string;
    protected deskripsi: string;
    public materi: Materi[];

    protected jumlahSelesai: number;
    protected jumlahPelajaran: number
    public icon: ReactNode;

    constructor();
    constructor(
        id: string,
        judul: string,
        deskripsi: string,
        materi: Materi[],
        icon: ReactNode
    )
    constructor(
        id: string = '',
        judul: string = '',
        deskripsi: string = '',
        materi: Materi[] = [],
        icon: ReactNode = null
    ) {
        this.id = id;
        this.judul = judul;
        this.deskripsi = deskripsi;
        this.materi = materi;

        this.jumlahSelesai = materi.filter(item => item.getSelesai == true).length;
        this.jumlahPelajaran = materi.length
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

    clone(): Modul {
        return new Modul(this.id, this.judul, this.deskripsi, this.materi, this.icon)
    }
}

export default Modul