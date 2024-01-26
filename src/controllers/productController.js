import ProductManager from '../dao/productManager.js';

class ProductController {
  constructor() {
    this.productManager = new ProductManager();
  }

  getAllProducts(queryParams) {
    return this.productManager.getAllProducts(queryParams);
  }

  getProductById(productId) {
    return this.productManager.getProductById(productId);
  }

  addProduct(newProductData) {
    return this.productManager.addProduct(newProductData);
  }

  updateProduct(productId, updatedProductData) {
    return this.productManager.updateProduct(productId, updatedProductData);
  }

  deleteProduct(productId) {
    return this.productManager.deleteProduct(productId);
  }
}

export default ProductController;
