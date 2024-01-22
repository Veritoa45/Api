import Product from '../models/product.model.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}

export const getOneProduct = async (req, res) => {
    try {
        const title = req.params.title
        const product = await Product.findOne({ title })
        if(!product) {
            return res.status(404).json({ message: "Producto no existente" })
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al obtener el producto" })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body
        if(!title || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" })
        }
        const isRepeated = await Product.find({ title })
        if (isRepeated.length > 0) {
            return res.status(400).json({ message: "El producto ya existe" })
        }
        const availableCategories = ["Semanal", "Diaria", "Perpetua"]
        if (!availableCategories.includes(category)) {
            return res.status(400).json({ message: "La categoria no es valida" })
        }
        const product = new Product({
            title,
            description,
            price,
            thumbnail: req.file.filename,
            stock,
            category,
        })
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al crear el producto" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const title = req.params.title
        const { stock, price, description } = req.body
        console.log('Received data from client:', { stock, price, description });
        const numericStock = !isNaN(stock) ? parseInt(stock, 10) : null;
        const numericPrice = !isNaN(price) ? parseFloat(price) : null;

        if (isNaN(numericStock) || isNaN(numericPrice)) {
            return res.status(400).json({ message: "Los valores de stock y/o price no son válidos" });
        }

        const validDescription = description !== undefined ? description : null;

        if (description !== null && validDescription === null) {
            console.log("Valor de description:", description);
            console.log("Tipo de description:", typeof description);
            return res.status(400).json({ message: "El valor de description no es válido" });
        }
        const product = await Product.findOneAndUpdate({ title }, {
            stock: numericStock, 
            price: numericPrice,
            description: validDescription
        }, 
        { 
            new: true 
        },
        )
        if(!product) {
            return res.status(404).json({ message: "Producto incorrecto" })
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al actualizar el producto" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const title = req.params.title
        const product = await Product.findOneAndDelete({ title })
        if(!product) {
            return res.status(404).json({ message: "Producto incorrecto" })
        }
        res.status(200).json({ message: "Producto eliminado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al eliminar el producto" })
    }
}