const Sequelize = require('sequelize');

const initializeDb = () => {
    // Create connection - No username password for now
    const con = new Sequelize('', '', '', {
       dialect: 'sqlite',
       storage: 'node_server.sqlite',
    });
    // Connect to Database
    // Instantiate models
    // Sync database with models
};

export default initializeDb;