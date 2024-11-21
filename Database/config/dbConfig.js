const commonFunction = {
    create1: async (model, data) => {
        return await model.create(data);
    },

    getAll: async (model) => {
        return await model.findAll();
    },

    getById: async (model, condition) => {
        return await model.findOne({ where: condition });
    },

    update: async (model, bodyData, condition) => {
        return await model.update(bodyData, { where: condition });
    },

    delete: async (model, condition) => {
        return await model.destroy({ where: condition });
    },

    
    getAllProducts: async (model, aggregation, include, where, order) => {
        return await model.findAndCountAll({
            attributes : aggregation,
            include : include,
            where,
            order
        });
    }
};

const paginationFunction = {

    getPagination: (reqQuery) => {

        const limit = reqQuery.limit ? +reqQuery.limit : 10;

        const page = reqQuery.page ? +reqQuery.page : 1;

        const offset = (page - 1) * limit;

        if (isNaN(reqQuery.page) || reqQuery.page <= 0 || isNaN(reqQuery.page) || reqQuery.limit <= 0) {
            return {
                data : [],
                pagination : {
                    totalCounts : 0,
                    totalPages : 0,
                    currentPage : 0,
                    nextPage : 0
                }
            }
        }

    },

}
module.exports = { commonFunction };