// --------------- ASSETS ---------------
import { database } from '../db';

const master_companies = database.collections.get('posts');

export default {
    observeMasterCompany: () => master_companies.query().observe(),
    createMasterCompany: async ({ title, body }) => {
        await database.action(async () => {
            await master_companies.create((master_company) => {
                master_company.name = title;
                // master_company.body = body;
            });
        });
    },
    deleteAll: async () => {
        await database.action(async () => {
            await master_companies.query().destroyAllPermanently();
        });
    },
};