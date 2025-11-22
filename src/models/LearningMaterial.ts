/**
 * Merepresentasikan materi tunggal dari sebuah modul pembelajaran,
 * memuat id, deskripsi, status penyelesaian, dan lokasi gambar serta suara 
 */
class LearningMaterial {
    protected _id: string;
    protected _description: string;
    protected _isLearned: boolean = false;
    protected _image: string;
    protected _sound: string;

    /**
     * @param {string} id - nilai unik dari materi, misal 'a', 's', 'halo', 'apa', dan 'saya'
     * @param {string} description - deskripsi untuk memperjelas isi dari materi
     * @param {boolean} isFinished - menentukan apakah materi sudah dipelajari atau belum
     * @param {string} image - lokasi dari file gambar, misal /src/assets/images/letter/a.png
     * @param {string} sound - lokasi dari file suara, misal /src/assets/sound/letter/a.mp3
     */
    constructor(
        id: string,
        description: string,
        isFinished: boolean,
        image: string,
        sound: string,
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

    /**
     * Mengubah materi menjadi selesai dipelajari 
     * dan menyimpan progressnya
     * 
     * @param {string} key - kunci unik berupa nama modul, misal 'letter' atau 'word'
     */
    changeFinishedTrue(key: string) {
        this._isLearned = true;
        window.api.addFinished(key, this._id);
    }

    /**
     * Meng-copy materi
     * dipakai agar framework bisa melakukan render ketika update terjadi
     * 
     * @returns LearningMaterial
     */
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