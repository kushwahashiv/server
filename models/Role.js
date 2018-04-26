'use strict';

const config = require('../config');

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            required: true,
            validate: { notEmpty: true },
        },
    }, config.sources.database.modelOptions);
    Role.associate = (models) => {
        Role.hasMany(models.User);
    };
    return Role;
};