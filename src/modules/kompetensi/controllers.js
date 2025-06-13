import * as KompetensiService from './services.js';

//View
export const index = async (req, res, next) => {
    try {
        const kompetensis = await KompetensiService.getAllKompetensi();
        const data = {
            title: 'Kompetensi',
            kompetensis,
        }

        res.edge('pages/kompetensi/index', data);
    } catch (error) {
        next(error)
    }
};

export const create = async (req, res, next) => {
    try {
        const data = {
            title: 'Tambah Kompetensi',
        }

        res.edge('pages/kompetensi/create', data);
    } catch (error) {
        next(error)
    }
}

export const edit = async (req, res, next) => {
    try {
        const kompetensi = await KompetensiService.getKompetensiById(req.params.id);
        const data = {
            title: 'Edit Kompetensi',
            kompetensi,
        }

        res.edge('pages/kompetensi/edit', data);
    } catch (error) {
        next(error);
    }
}

//API
export const store = async (req, res, next) => {
    try {
        const kompetensi = await KompetensiService.createKompetensi(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Kompetensi created successfully',
            data: kompetensi,
        });
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const kompetensi = await KompetensiService.updateKompetensi(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Karyawan updated successfully',
            data: kompetensi,
        });
    } catch (error) {
        next(error);
    }
}

export const destroy = async (req, res, next) => {
    try {
        const kompetensi = await KompetensiService.deleteKompetensi(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Kompetensi deleted successfully',
            data: kompetensi,
        });
    } catch (error) {
        next(error);
    }
}