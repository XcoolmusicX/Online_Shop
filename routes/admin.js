const express = require('express')
const router = express.Router();

const adminController = require('../controller/admin');


router.get('/' , adminController.getadminproduct)


router.get('/add-product' , adminController.addProductadmin)

router.post('/add-product' , adminController.createProduct)

router.get('/edit-product/:productId' , adminController.getEditProduct)

router.post('/edit-product' , adminController.postEditProduct)

router.post('/delete-product' , adminController.deleteProduct)




module.exports = router