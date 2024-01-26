import Cart from './models/cartModel.js';

class CartManager {
  async createCart() {
    const cart = await Cart.create({});
    return cart;
  }

  async getCart(cartId) {
    const cart = await Cart.findById(cartId).populate('products.product');
    return cart.products;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart.products;
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products = cart.products.filter((item) => item.product.toString() !== productId);
    await cart.save();
    return cart.products;
  }

  async updateCart(cartId, updatedProducts) {
    const cart = await Cart.findById(cartId);
    cart.products = updatedProducts;
    await cart.save();
    return cart.products;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity = quantity;
      await cart.save();
    }

    return cart.products;
  }

  async deleteAllProducts(cartId) {
    const cart = await Cart.findById(cartId);
    cart.products = [];
    await cart.save();
    return cart.products;
  }
}

export default CartManager;
