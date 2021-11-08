import mssql from "mssql/msnodesqlv8.js";
import AppConstants from "../../shared/AppConstants.js";

const databseConfig = {
    user: AppConstants.DB_CONFIG.USERNAME,
    password: AppConstants.DB_CONFIG.PASSWORD,
    database: AppConstants.DB_CONFIG.DB_NAME,
    server: AppConstants.DB_CONFIG.DB_SERVER,
    driver: "msnodesqlv8",
    pool: {
        max: 10,
        min: 0,
    },
    options: {
        trustedConnection: AppConstants.DB_CONFIG.IS_TRUSTED,
    },
    parseJSON: true,
};

const connectionPool = new mssql.ConnectionPool({...databseConfig }).connect();

export default connectionPool;
