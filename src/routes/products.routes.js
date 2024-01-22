import { Router } from 'express'
import { isAdmin } from '../middlewares/isAdmin.js'
import { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js'
import { upload } from '../lib/upload.js'

const productsRouter = Router()

productsRouter.get('/', getAllProducts)
productsRouter.get('/:title', getOneProduct)
productsRouter.post('/', isAdmin, upload.single("thumbnail"), createProduct)
productsRouter.put('/:title', isAdmin, updateProduct)
productsRouter.delete('/:title', isAdmin, deleteProduct)

export { productsRouter }