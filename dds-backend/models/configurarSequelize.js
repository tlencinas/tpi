import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './.data/pymes.db',
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

export default sequelize;