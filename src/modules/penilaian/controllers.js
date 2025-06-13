import * as AirportService from './services.js';

export const index = async (req, res, next) => {
    try {
        const token = req.session.token;
        const airports = await AirportService.getAllAirport(token);
        const api = process.env.API_URL;
        const data = {
            title: 'Airport',
            airports,
            api
        };

        res.edge('pages/penilaian/index', data);
    } catch (error) {
        next(error)
    };
};

export const edit = async (req, res, next) => {
    try {
        const token = req.session.token;
        const airport = await AirportService.getAirportById(req.params.id, token);
        const api = process.env.API_URL;
        const data = {
            title: 'Airport',
            airport,
            api
        };

        res.edge('pages/penilaian/edit', data);
    } catch (error) {
        next(error);
    };
};