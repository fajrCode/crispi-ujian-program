import * as DashboardService from './services.js';

export const index = async (req, res, next) => {
    try {
        const karyawanRangking = await DashboardService.karyawanRangking();
        console.log(karyawanRangking);
        const data = {
            title: 'Dashboard',
            karyawanRangking,
        }

        res.edge('pages/dashboard/index', data);
    } catch (error) {
        next(error)
    }
};