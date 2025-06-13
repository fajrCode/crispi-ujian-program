import * as PenilaianService from './services.js';
import { getAllKaryawan } from '../karyawan/services.js'
import { getAllKompetensi } from '../kompetensi/services.js'

//View
export const index = async (req, res, next) => {
    try {
        const penilaians = await PenilaianService.getAll();
        const data = {
            title: 'Penilaian',
            penilaians,
        }

        res.edge('pages/penilaian/index', data);
    } catch (error) {
        next(error)
    }
};

export const create = async (req, res, next) => {
    try {
        const karyawans = await getAllKaryawan();
        const kompetensis = await getAllKompetensi();
        const data = {
            title: 'Tambah Penilaian',
            karyawans,
            kompetensis,
        }

        res.edge('pages/penilaian/create', data);
    } catch (error) {
        next(error)
    }
}

export const edit = async (req, res, next) => {
    try {
        const penilaian = await PenilaianService.getById(req.params.id);
        const karyawans = await getAllKaryawan();
        const kompetensis = await getAllKompetensi();
        const data = {
            title: 'Edit Penilaian',
            penilaian,
            karyawans,
            kompetensis,
        }
        console.log(data)

        res.edge('pages/penilaian/edit', data);
    } catch (error) {
        next(error);
    }
}

//API
export const store = async (req, res, next) => {
    try {
        const penilaian = await PenilaianService.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Penilaian created successfully',
            data: penilaian,
        });
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const penilaian = await PenilaianService.update(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Penilaian updated successfully',
            data: penilaian,
        });
    } catch (error) {
        next(error);
    }
}

export const destroy = async (req, res, next) => {
    try {
        const penilaian = await PenilaianService.destroy(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Penilaian deleted successfully',
            data: penilaian,
        });
    } catch (error) {
        next(error);
    }
}