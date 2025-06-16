import {DataTypes} from "sequelize";
import sequelize from './configurarSequelize.js';

const Categorias = sequelize.define('Categorias', {
    IdCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Categorias;