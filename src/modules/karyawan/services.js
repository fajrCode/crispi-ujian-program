import { Error400, Error404 } from '../../utils/customError.js';
import db from '../../configs/database.js';

export const getAllKaryawan = async () => {
    const karyawans = await db.karyawan.findMany();

    return karyawans;
};

export const getKaryawanById = async (id) => {
    const karyawan = await db.karyawan.findUnique({
        where: { id: parseInt(id) },
    });

    if (!karyawan) {
        throw new Error404('Karyawan tidak ditemukan', 404);
    }

    return karyawan;
};

export const detailKaryawan = async (id) => {
    // const karyawan = await db.penilaian.findMany({
    //     where: {
    //         karyawanId: parseInt(id),
    //     },
    //     select: {
    //         id: true,
    //         periode: true,
    //         nilai: true,
    //         karyawan: {
    //             select: {
    //                 id: true,
    //                 nama: true
    //             }
    //         },
    //         kompetensi: {
    //             select: {
    //                 id: true,
    //                 namaKompetensi: true,
    //             }
    //         }
    //     }
    // });

    const karyawan = await db.karyawan.findFirst({
        where: {
            id: parseInt(id),
        },
        include: {
            Penilaian: {
                include: {
                    kompetensi: true,
                }
            }
        }
    })

    if (!karyawan) {
        throw new Error404('Karyawan tidak ditemukan', 404);
    }

    return karyawan;
}

export const createKaryawan = async (data) => {
    const { nama, jabatan, unitKerja, tanggalBergabung } = data;

    // Validasi input
    if (!nama || !jabatan || !jabatan || !unitKerja || !tanggalBergabung) throw new Error400('Semua field harus diisi', 400);
    // Cek apakah email sudah ada
    const existingKaryawan = await db.karyawan.findFirst({
        where: { nama },
    });

    if (existingKaryawan) throw new Error400('Karyawan sudah terdaftar', 400);
    data.tanggalBergabung = new Date(tanggalBergabung);
    // Buat karyawan baru
    const karyawan = await db.karyawan.create({ data });

    return karyawan;
}

export const updateKaryawan = async (id, data) => {
    console.log(data)
    const { nama, jabatan, unitKerja, tanggalBergabung } = data;

    // Validasi input
    if (!nama || !jabatan || !unitKerja || !tanggalBergabung) throw new Error400('Semua field harus diisi', 400);

    // Cek apakah karyawan ada
    const existingKaryawan = await db.karyawan.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingKaryawan) {
        throw new Error404('Karyawan tidak ditemukan', 404);
    }

    data.tanggalBergabung = new Date(tanggalBergabung);

    // Update karyawan
    const karyawan = await db.karyawan.update({
        where: { id: parseInt(id) },
        data,
    });

    return karyawan;
}

export const deleteKaryawan = async (id) => {
    // Cek apakah karyawan ada
    const existingKaryawan = await db.karyawan.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingKaryawan) throw new Error404('Karyawan tidak ditemukan', 404);

    // Hapus karyawan
    await db.karyawan.delete({
        where: { id: parseInt(id) },
    });

    return { message: 'Karyawan berhasil dihapus' };
}