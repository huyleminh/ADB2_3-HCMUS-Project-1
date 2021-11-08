import dotenv from "dotenv";

dotenv.config();

class AppConstants {
    static get PORT() {
        return process.env.PORT;
    }

    static get AUTH_CLIENT_URL() {
        return process.env.AUTH_CLIENT_URL;
    }

    static get DB_CONFIG() {
        return {
            USERNAME: process.env.DB_USERNAME,
            PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
            DB_SERVER: process.env.DB_SERVER,
            IS_TRUSTED: process.env.DB_IS_TRUSTED,
        };
    }
}

export default AppConstants;
