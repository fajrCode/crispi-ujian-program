export const index = async (req, res, next) => {
    try {
        const data = {
            title: 'Dashboard'
        }

        res.edge('pages/dashboard/index', data);
    } catch (error) {
        next(error)
    }
};