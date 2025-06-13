import { Error400, Error404 } from '../../utils/customError.js';
import db from '../../configs/database.js';

export const getAll = async () => {
    const penilaians = await db.penilaian.findMany({
        select: {
            id: true,
            karyawan: {
                select: {
                    id: true,
                    nama: true,
                }
            },
            kompetensi: {
                select: {
                    id: true,
                    namaKompetensi: true,
                }
            },
            periode: true,
            nilai: true,
        }
    });

    return penilaians;
};

export const getById = async (id) => {
    const penilaian = await db.penilaian.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            karyawan: {
                select: {
                    id: true,
                    nama: true,
                }
            },
            kompetensi: {
                select: {
                    id: true,
                    namaKompetensi: true,
                }
            },
            periode: true,
            nilai: true,
        }
    });

    if (!penilaian) {
        throw new Error404('Penilaian tidak ditemukan', 404);
    }

    return penilaian;
};

export const create = async (data) => {
    const { karyawanId, kompetensiId, periode, nilai } = data;
    data.karyawanId = parseInt(karyawanId);
    data.kompetensiId = parseInt(kompetensiId);
    data.nilai = parseInt(nilai);
    // Validasi input
    if (!karyawanId || !kompetensiId || !periode || !nilai) throw new Error400('Semua field harus diisi', 400);

    const kompetensi = await db.penilaian.create({ data });

    return kompetensi;
}

export const update = async (id, data) => {
    const { karyawanId, kompetensiId, periode, nilai } = data;
    data.karyawanId = parseInt(karyawanId);
    data.kompetensiId = parseInt(kompetensiId);
    data.nilai = parseInt(nilai);
    // Validasi input
    if (!karyawanId || !kompetensiId || !periode || !nilai) throw new Error400('Semua field harus diisi', 400);

    // Cek apakah karyawan ada
    const existingPenilaian = await db.penilaian.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingPenilaian) {
        throw new Error404('Penilaian tidak ditemukan', 404);
    }

    // Update karyawan
    const penilaian = await db.penilaian.update({
        where: { id: parseInt(id) },
        data,
    });

    return penilaian;
}

export const destroy = async (id) => {
    const existingPenilaian = await db.penilaian.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingPenilaian) throw new Error404('Penilaian tidak ditemukan', 404);

    // Hapus karyawan
    await db.penilaian.delete({
        where: { id: parseInt(id) },
    });

    return { message: 'Penilaian berhasil dihapus' };
}