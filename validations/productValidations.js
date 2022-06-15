const {body} = require('express-validator')

module.exports = [
    body('name')
        .notEmpty().withMessage('El nombre del producto el obligatorio').bail()
        .isLength({min:3,max:20}).withMessage('Mínimo 3 caracteres'),
    
    body('price')
        .notEmpty()
        .withMessage('Debes indicar un precio').bail(),
    
    body('category')
        .notEmpty()
        .withMessage('Se requiere una categoría').bail(),
    body('stock')
        .notEmpty()
        .withMessage('Debes indicar el stock').bail(),
    body('brand')
        .notEmpty()
        .withMessage('Debes indicar un precio').bail()
        .isLength({min:3,max:20}).withMessage('Mínimo 3 caracteres'),
    body('description')
        .notEmpty()
        .withMessage('Debes indicar un precio').bail(),
]
