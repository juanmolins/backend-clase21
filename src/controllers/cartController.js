import CartManager from '../dao/cartManager.js';

class CartController {
  constructor() {
    this.cartManager = new CartManager();
  }

  createCart() {
    return this.cartManager.createCart();
  }

  getCart(cartId) {
    return this.cartManager.getCart(cartId);
  }

  addProductToCart(cartId, productId, quantity) {
    return this.cartManager.addProductToCart(cartId, productId, quantity);
  }

  deleteProductFromCart(cartId, productId) {
    return this.cartManager.deleteProductFromCart(cartId, productId);
  }

  updateCart(cartId, updatedProducts) {
    return this.cartManager.updateCart(cartId, updatedProducts);
  }

  updateProductQuantity(cartId, productId, quantity) {
    return this.cartManager.updateProductQuantity(cartId, productId, quantity);
  }

  deleteAllProducts(cartId) {
    return this.cartManager.deleteAllProducts(cartId);
  }
}

export default CartController;
