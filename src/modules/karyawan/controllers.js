import * as KaryawanService from './services.js';

//View
export const index = async (req, res, next) => {
    try {
        const karyawans = await KaryawanService.getAllKaryawan();
        const data = {
            title: 'Karyawan',
            karyawans,
        }

        res.edge('pages/karyawan/index', data);
    } catch (error) {
        next(error)
    }
};

export const create = async (req, res, next) => {
    try {
        const data = {
            title: 'Tambah Karyawan',
        }

        res.edge('pages/karyawan/create', data);
    } catch (error) {
        next(error)
    }
}

export const edit = async (req, res, next) => {
    try {
        const karyawan = await KaryawanService.getKaryawanById(req.params.id);
        karyawan.tanggalBergabung = karyawan.tanggalBergabung.toISOString().split('T')[0];
        const data = {
            title: 'Edit Karyawan',
            karyawan,
        }

        res.edge('pages/karyawan/edit', data);
    } catch (error) {
        next(error);
    }
}

//API
export const store = async (req, res, next) => {
    try {
        const karyawan = await KaryawanService.createKaryawan(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Karyawan created successfully',
            data: karyawan,
        });
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const karyawan = await KaryawanService.updateKaryawan(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Karyawan updated successfully',
            data: karyawan,
        });
    } catch (error) {
        next(error);
    }
}

export const destroy = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const karyawan = await KaryawanService.deleteKaryawan(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Karyawan deleted successfully',
            data: karyawan,
        });
    } catch (error) {
        next(error);
    }
}