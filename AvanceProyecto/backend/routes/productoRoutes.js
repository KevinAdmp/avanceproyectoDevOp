const express = require("express");
const Producto = require("../models/Producto"); // El modelo debe ser singular y consistente

const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find(); // Usar el modelo correctamente
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

// Editar un producto
router.put("/:id", async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

module.exports = router;
