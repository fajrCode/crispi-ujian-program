import { Router } from 'express';
import dashboardRouter from './dashboard/routes.js';
import karyawanRouter from './karyawan/routes.js';
import kompetensiRouter from './kompetensi/routes.js';
import penilaianRouter from './penilaian/routes.js';

export default (app) => {
    const router = Router();

    app.get('/', (req, res) => {
        res.redirect('/dashboard');
    });

    // prefix all routes
    app.use('/', router);
    
    // router.use(authMiddleware);
    dashboardRouter(router);
    karyawanRouter(router);
    kompetensiRouter(router);
    penilaianRouter(router);
};