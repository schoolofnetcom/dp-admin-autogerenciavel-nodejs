const adminBro = require('admin-bro');
const adminBroExpress = require('@admin-bro/express');
const adminBroMongoose = require('@admin-bro/mongoose');
const app = require('express')();
const mongoose = require('mongoose');

const runAdminBro = async() => {
    const mongoConnection = await mongoose.connect('mongodb://root:root@127.0.0.1:27017/app_adminbro?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });
    const Task = mongoose.model('Task', new mongoose.Schema({
        title: String,
        done: Boolean
    }));
    
    adminBro.registerAdapter(adminBroMongoose);

    const optsAdminBro = {
        databases: [mongoConnection],
        rootPath: '/admin',
        resources: [Task]
    };
    const appAdmin = new adminBro(optsAdminBro);

    const router = adminBroExpress.buildRouter(appAdmin);
    app.use(appAdmin.options.rootPath, router);
    
    app.listen(3000, () => console.log('Admin BRO has been started...'));
};

runAdminBro();