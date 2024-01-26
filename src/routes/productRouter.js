import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', async (req, res) => {
  const queryParams = req.query;
  try {
    const products = await productController.getAllProducts(queryParams);
    res.render('products', {products});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productController.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.post('/', async (req, res) => {
  const newProductData = req.body;
  try {
    const newProduct = await productController.addProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productController.updateProduct(pid, updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    await productController.deleteProduct(pid);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
