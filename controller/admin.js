const product = require('../model/product');



exports.addProductadmin = (req, res) => {
    res.render('admin/addproduct')
}



exports.createProduct = async (req, res) => {
   
    const prod = {
        title: req.body.title,
        imgUrl: req.body.imageUrl,
        price: req.body.price,
        userId : req.user
    }
    const new_prod = new product.Product(prod)
    // saving in database 
    await new_prod.save()
    res.redirect('/admin')

}


exports.getadminproduct = async(req, res)=>{

    const all_product = await product.Product.find()
    res.render('admin/admin.ejs' , {prod : all_product})

}


exports.getEditProduct = async(req , res ) =>{
    const prodId = req.params.productId;
    // console.log(typeof prodId)
    const products = await product.Product.findById(prodId)

    res.render('admin/edit-product.ejs' , {prod : products})
}

exports.postEditProduct = async (req , res ) => {
    const prod_item = await product.Product.findById(req.body.prodId)
    prod_item.title = req.body.title
    prod_item.price = req.body.price
    prod_item.imageUrl = req.body.imgUrl

    await prod_item.save()
    res.redirect('/admin')

}

exports.deleteProduct = async (req, res )=>{
    const prodId = req.body.productId
    await product.Product.findByIdAndRemove(prodId)
    res.redirect('/admin')
}