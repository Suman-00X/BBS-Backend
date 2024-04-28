import productModel from '../Models/ProductModel.js';

// Add
const addHoodie = async (req, res) => {
  try {
    const { name, description, price, color, size, image, quantity } = req.body;

    console.log("I am addHoodie-controller")
    console.log(name, description, price, color, size, image, quantity )

    const newProduct = await productModel.create({
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    });

    console.log(newProduct)

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

// Update
const updateHoodie = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("I am updateHoodie-controller")

    const { name, description, price, color, size, image, quantity } = req.body;

    console.log(name, description, price, color, size, image, quantity )

    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      color,
      size,
      image,
      quantity,
    }, { new: true });

    console.log(updateHoodie)

    res.json(updatedProduct);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

// Delete
const deleteHoodie = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("I am deleteHoodie-controller")

    await productModel.findByIdAndDelete(productId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};

export { addHoodie, updateHoodie, deleteHoodie };
