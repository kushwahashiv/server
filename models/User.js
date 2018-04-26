'use strict';

const config = require('../config');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
        name: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, config.sources.database.modelOptions);
    User.associate = (models) => {
        User.belongsTo(models.Role, { foreignKey: 'RoleId' });
    };
    return User;
};