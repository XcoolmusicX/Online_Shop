const product = require('../model/product');
const User = require('../model/user');

exports.getProducts = (req, res) => {
    product.Product.find()
        .then(products => {
            res.render('shop/shop', { prod: products })
        })
        .catch(() => {
            res.send('Error on controller shop line 11')
        })

}


exports.addcart = (req, res) => {
    const prodId = req.body.productId;

    product.Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/');
        });

}




exports.getcart = async (req, res, next) => {

    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        products: products,
        
      });
    })
    .catch(err => console.log(err));

}



exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.prod_Id;
    req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
  };