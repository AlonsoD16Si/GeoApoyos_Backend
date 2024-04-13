import { Sequelize } from "sequelize";


const db = new Sequelize('geoApoyo_db', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false
});

export default db