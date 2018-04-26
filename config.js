const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};

const config = {
    port: process.env.CCD_PORT || process.env.PORT || 8080,
    sources: {
        database: {
            dbName: process.env.DATABASE_DBNAME || 'node-server',
            user: process.env.DATABASE_USER || '',
            password: process.env.DATABASE_PASSWORD || '',
            options: {
                dialect: 'sqlite',
                storage: 'node-server.sqlite',
                operatorsAliases,
            },
            sync: {
                force: true, // Change to true to re-initialize database (not recommended for PROD)
            },
            logging: true, // Change to true to log DB queries (not recommended for PROD)
            modelOptions: {
                // schema: process.env.DATABASE_SCHEMA || 'MAKER_SIGHT',
            },
        },
    },
};

module.exports = config;
