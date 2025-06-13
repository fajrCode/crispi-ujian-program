import * as KompetensiController from './controllers.js';

export default (router) => {
    const prefix = '/kompetensi';
    router.get(prefix + '/', KompetensiController.index);
    router.get(prefix + '/create', KompetensiController.create);
    router.get(prefix + '/edit/:id', KompetensiController.edit);
    router.post(prefix + '/store', KompetensiController.store);
    router.patch(prefix + '/update/:id', KompetensiController.update);
    router.delete(prefix + '/:id', KompetensiController.destroy);
}