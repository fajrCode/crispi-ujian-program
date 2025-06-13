import * as UserController from './controllers.js';

export default (router) => {
    const prefix = '/karyawan';
    router.get(prefix + '/', UserController.index);
    router.get(prefix + '/create', UserController.create);
    router.get(prefix + '/edit/:id', UserController.edit);
    router.post(prefix + '/store', UserController.store);
    router.patch(prefix + '/update/:id', UserController.update);
    router.delete(prefix + '/:id', UserController.destroy);
}