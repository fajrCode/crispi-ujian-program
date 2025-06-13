// import { Error400, Error404 } from '../../utils/customError.js';
import db from '../../configs/database.js';

export const karyawanRangking = async () => {
    const rangking = await db.penilaian.groupBy({
        by: ['karyawanId'],
        _avg: {
            nilai: true,
        },
        orderBy: {
            _avg: {
                nilai: 'desc',
            },
        },
    });

    const karyawanRangking = await Promise.all(rangking.map(async (item) => {
        const karyawan = await db.penilaian.findUnique({
            where: { karyawanId: item.karyawanId },
            select: {
                id: true,
                karyawan:{
                    select: {
                        id: true,
                        nama: true,
                    }
                },
                periode: true,
            }
        });
        return {
            ...item,
            karyawan,
        };
    }));

    return karyawanRangking;
}