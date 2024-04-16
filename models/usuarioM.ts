// Usuario.ts
import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';
import { SolicitanteInstance } from '../models/solicitante';


interface UsuarioAttributes {
    idUsuario: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    puesto: string;
    fechaContratacion: string;
    sueldo: string;
    correo: string;
    contrasenia: string;
    estatus: string;
    Solicitante?: SolicitanteInstance; // Agrega esta línea

}

export interface UsuarioInstance extends Model<UsuarioAttributes>, UsuarioAttributes {}

const Usuario = db.define<UsuarioInstance>('usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    primerApellido: {
        type: DataTypes.STRING
    },
    segundoApellido: {
        type: DataTypes.STRING
    },
    puesto: {
        type: DataTypes.STRING
    },
    fechaContratacion: {
        type: DataTypes.STRING
    },
    sueldo: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.STRING,
        defaultValue: 'AC'
    }
}, {
    tableName: 'usuario', 
    timestamps: false,
    schema: "GeoApoyo"
});


export default Usuario;
