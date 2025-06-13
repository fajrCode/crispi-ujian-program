import * as PenilaianController from './controllers.js';

export default (router) => {
    const prefix = '/penilaian';
    router.get(prefix + '/', PenilaianController.index);
    router.get(prefix + '/create', PenilaianController.create);
    router.get(prefix + '/edit/:id', PenilaianController.edit);
    router.post(prefix + '/store', PenilaianController.store);
    router.patch(prefix + '/update/:id', PenilaianController.update);
    router.delete(prefix + '/:id', PenilaianController.destroy);
}