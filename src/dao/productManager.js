import Product from './models/productModel.js';

class ProductManager {
  async getAllProducts(queryParams) {
    const { limit = 10, page = 1, sort, query, category, status } = queryParams;

    const filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const count = await Product.countDocuments(filter);
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    let products = Product.find(filter).skip(skip).limit(limit);

    if (sort === 'asc') {
      products = products.sort({ price: 1 });
    } else if (sort === 'desc') {
      products = products.sort({ price: -1 });
    }

    return {
      status: 'success',
      payload: await products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}` : null,
    };
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    return product;
  }

  async addProduct(newProductData) {
    const newProduct = await Product.create(newProductData);
    return newProduct;
  }

  async updateProduct(productId, updatedProductData) {
    const product = await Product.findByIdAndUpdate(productId, updatedProductData, {
      new: true,
    });
    return product;
  }

  async deleteProduct(productId) {
    await Product.findByIdAndDelete(productId);
  }
}

export default ProductManager;
