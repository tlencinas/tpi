import {DataTypes} from "sequelize";
import sequelize from './configurarSequelize.js';

const Usuarios = sequelize.define('Usuarios', {
    IdUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Usuarios;