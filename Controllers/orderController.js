import productModel from '../Models/ProductModel.js';
import orderModel from '../Models/OrderModel.js';

// Get all products
const getAllHoodies = async (req, res) => {
  try {
    console.log("I am getAllHoodie-conttroller")

    // const userId = req.user._id;
    const products = await productModel.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};


// Get one hoodie
const getOneHoodie = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("I am getOneHoodie-conttroller")

    const product = await productModel.findById(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};


// Place order
const orderHoodie = async (req, res) => {
  try {
    const { product, quantity, address } = req.body;
    const userId = req.user._id;

    console.log("I am orderHoodie-controller");

    if (!product) {
      return res.status(400).json({ message: "Product is required" });
    }
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const productItem = await productModel.findById(product);
    if (!productItem) {
      return res.status(404).json({ message: `Product with ID ${product} not found` });
    }
    if (quantity > productItem.quantity) {
      return res.status(400).json({ message: `Insufficient stock for product ${productItem.name}` });
    }

    const totalPrice = quantity * productItem.price;

    const order = await orderModel.create({
      user: userId,
      products: [{ product: productItem._id, quantity }],
      address,
      totalPrice
    });
    console.log(order);

    productItem.quantity -= quantity;
    await productItem.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
};


//get all orders
const getAllOrders = async (req, res) => {

  console.log("i am getAllOrders controller")
  try {
    
    const userId = req.user._id;
    const orders = await orderModel.find({ user: userId }).populate('products.product');
    
    console.log(orders)
    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export { getAllHoodies, getOneHoodie, orderHoodie, getAllOrders };
