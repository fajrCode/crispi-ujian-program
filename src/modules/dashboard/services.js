// import { Error400, Error404 } from '../../utils/customError.js';
import db from '../../configs/database.js';

export const karyawanRangking = async () => {
    const rangking = await db.penilaian.groupBy({
        by: ['karyawanId', 'periode'],
        _avg: {
            nilai: true,
        },
    });

    // Kelompokkan berdasarkan periode
    const groupedByPeriode = rangking.reduce((acc, item) => {
        const periode = item.periode;
        if (!acc[periode]) {
            acc[periode] = [];
        }
        acc[periode].push(item);
        return acc;
    }, {});

    // Ambil 1 karyawan dengan nilai tertinggi dari setiap periode
    const topPeriode = Object.values(groupedByPeriode).map(group => {
        return group.reduce((max, item) => {
            return item._avg.nilai > max._avg.nilai ? item : max;
        });
    });

    // Ambil detail karyawan dari hasil topPeriode
    const karyawanRangking = await Promise.all(
        topPeriode.map(async (item) => {
            const karyawan = await db.karyawan.findUnique({
                where: { id: item.karyawanId },
                select: {
                    id: true,
                    nama: true,
                },
            });

            return {
                karyawanId: item.karyawanId,
                periode: item.periode,
                nilaiRerata: item._avg.nilai,
                karyawan,
            };
        })
    );

    return karyawanRangking;

}