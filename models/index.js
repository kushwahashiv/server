const Source = require('../sources/database');

const globby = require('globby');
const path = require('path');

const source = Source;
const db = {};
const modelFiles = globby.sync(['*.js', '!index.js'], { cwd: __dirname });

modelFiles.forEach((file) => {
    const model = source.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.source = source;

module.exports = db;