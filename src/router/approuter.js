const express = require('express')

const productController = require('../controller/product')

const categoryController = require('../controller/category')

const historyController = require('../controller/history')

const upload = require('../helper/upload')

const router = express.Router()

router
    //CRUD tabel product
    .get('/product/getall', productController.getAll)
    .get('/product/getdetail/:id', productController.getDetail)
    .post('/product/insert', upload.single('image'), productController.insert)
    .put('/product/update/:id', upload.single('image'), productController.update)
    .patch('/product/updatepatch/:id', upload.single('image'), productController.updatePatch)
    .delete('/product/delete/:id', productController.delete)
    //CRUD tabel history
    .get('/history/getall', historyController.getAll)
    .get('/history/getdetail/:id', historyController.getDetail)
    .post('/history/insert', historyController.insert)
    .put('/history/update/:id', historyController.update)
    .delete('/history/delete/:id', historyController.delete)
    //CRUD tabel category
    .get('/category/getall', categoryController.getAll)
    .get('/category/getdetail/:id', categoryController.getDetail)
    .post('/category/insert', categoryController.insert)
    .put('/category/update/:id', categoryController.update)
    .delete('/category/delete/:id', categoryController.delete)

module.exports = router