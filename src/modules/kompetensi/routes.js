import * as AirportController from './controllers.js';

export default (router) => {
    const prefix = '/kompetensi';
    router.get(prefix + '/', AirportController.index);
    router.get(prefix + '/edit/:id', AirportController.edit);
}