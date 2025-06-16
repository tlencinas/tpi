import {DataTypes} from "sequelize";
import sequelize from './configurarSequelize.js';

const Articulos = sequelize.define('Articulos',
    {
        IdArticulo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate:
                {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [5, 60],
                    msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
                    },
                },
            unique: {
                args: true,
                msg: "este Nombre ya existe en la tabla!",
            },
        },
        Precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Precio es requerido",
                }
            }
        },
        CodigoDeBarra: {
            type: DataTypes.STRING(13),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Codigo De Barra es requerido",
                },
                is: {
                    args: ["^[0-9]{13}$", "i"],
                    msg: "Codigo de Barra debe ser numérico de 13 digitos",
                },
            },
        },
        IdCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "IdCategoria es requerido",
                }
            }
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Stock es requerido",
                }
            }
        },
        FechaAlta: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha Alta es requerido",
                }
            }
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Activo es requerido",
                }
            }
        },
    },
    {
        // pasar a mayusculas
        hooks: {
            beforeValidate: function (articulo, options) {
                if (typeof articulo.Nombre === "string") {
                    articulo.Nombre = articulo.Nombre.toUpperCase().trim();
                }
            },
        },
    }
);

export default Articulos;



