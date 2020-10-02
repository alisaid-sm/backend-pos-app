const express = require('express');

const productController = require('../controller/product');
const categoryController = require('../controller/category');
const historyController = require('../controller/history');
const usersController = require('../controller/users');
const { authentication, authorization } = require('../helper/auth');
const redis = require('../helper/redis');

const router = express.Router();

router
    //CRUD tabel product
    .get('/product/getall', authentication, authorization,redis.getProduct, productController.getAll)
    .get('/product/getdetail/:id', authentication, authorization, productController.getDetail)
    .post('/product/insert', authentication, authorization, productController.insert)
    .put('/product/update/:id', authentication, authorization, productController.update)
    .patch('/product/updatepatch/:id', authentication, authorization, productController.updatePatch)
    .delete('/product/delete/:id', authentication, authorization, productController.delete)
    //CRUD tabel history
    .get('/history/getall', authentication, authorization,redis.getHistory, historyController.getAll)
    .get('/history/getdetail/:id', authentication, authorization, historyController.getDetail)
    .post('/history/insert', authentication, authorization, historyController.insert)
    .put('/history/update/:id', authentication, authorization, historyController.update)
    .delete('/history/delete/:id', authentication, authorization, historyController.delete)
    //CRUD tabel category
    .get('/category/getall', authentication, authorization,redis.getCategory, categoryController.getAll)
    .get('/category/getdetail/:id', authentication, authorization, categoryController.getDetail)
    .post('/category/insert', authentication, authorization, categoryController.insert)
    .put('/category/update/:id', authentication, authorization, categoryController.update)
    .delete('/category/delete/:id', authentication, authorization, categoryController.delete)
    //CRUD tabel users
    .post('/users/register', usersController.register)
    .post('/users/login', usersController.login)
    .post('/users/refresh-token', usersController.renewToken);

module.exports = router;