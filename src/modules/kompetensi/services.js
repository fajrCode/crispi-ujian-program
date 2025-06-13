import { Error400, Error404 } from '../../utils/customError.js';
import db from '../../configs/database.js';

export const getAllKompetensi = async () => {
    const kompetensis = await db.kompetensi.findMany();

    return kompetensis;
};

export const getKompetensiById = async (id) => {
    const kompetensi = await db.kompetensi.findUnique({
        where: { id: parseInt(id) },
    });

    if (!kompetensi) {
        throw new Error404('Kompetensi tidak ditemukan', 404);
    }

    return kompetensi;
};

export const createKompetensi = async (data) => {
    const { namaKompetensi, deskripsi } = data;

    // Validasi input
    if (!namaKompetensi || !deskripsi) throw new Error400('Semua field harus diisi', 400);
    // Cek apakah email sudah ada
    const existingKompetensi = await db.kompetensi.findFirst({
        where: { namaKompetensi },
    });

    if (existingKompetensi) throw new Error400('Kompetensi sudah terdaftar', 400);

    const kompetensi = await db.kompetensi.create({ data });

    return kompetensi;
}

export const updateKompetensi = async (id, data) => {
    const { namaKompetensi, deskripsi } = data;

    // Validasi input
    if (!namaKompetensi || !deskripsi) throw new Error400('Semua field harus diisi', 400);

    // Cek apakah karyawan ada
    const existingKompetensi = await db.kompetensi.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingKompetensi) {
        throw new Error404('Kompetensi tidak ditemukan', 404);
    }

    // Update karyawan
    const kompetensi = await db.kompetensi.update({
        where: { id: parseInt(id) },
        data,
    });

    return kompetensi;
}

export const deleteKompetensi = async (id) => {
    const existingKompetensi = await db.kompetensi.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingKompetensi) throw new Error404('Kompetensi tidak ditemukan', 404);

    // Hapus karyawan
    await db.kopmetensi.delete({
        where: { id: parseInt(id) },
    });

    return { message: 'Kompetensi berhasil dihapus' };
}