import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
//import '../models/asociaciones';


dotenv.config();

const databaseConnection = new Sequelize('geoapoyos', 'doadmin', process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'postgres',
    port: 25060,
    protocol: 'null',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


export default databaseConnection;