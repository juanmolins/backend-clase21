import express from 'express';
import CartController from '../controllers/cartController.js';

const router = express.Router();
const cartController = new CartController();

router.post('/', async (req, res) => {
  try {
    const cart = await cartController.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cartProducts = await cartController.getCart(cid);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cartProducts = await cartController.addProductToCart(cid, pid, quantity);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

router.delete('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cartProducts = await cartController.deleteProductFromCart(cid, pid);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cartProducts = await cartController.updateCart(cid, products);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

router.put('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cartProducts = await cartController.updateProductQuantity(cid, pid, quantity);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    await cartController.deleteAllProducts(cid);
    res.json({ message: 'Todos los productos han sido eliminados del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar todos los productos del carrito' });
  }
});

export default router;
