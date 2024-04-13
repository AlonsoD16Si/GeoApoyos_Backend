import { Sequelize } from "sequelize";


const db = new Sequelize('GeoApoyo', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false
});

export default db