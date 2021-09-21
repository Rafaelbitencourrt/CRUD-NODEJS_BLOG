
const express = require('express');
const router = express.Router();

router.get('/categorias', (req, res)=>{
    res.send('Rota para categorias')
})
router.get('/admin/categorias', (req, res)=>{
    res.send('Rota para categorias do admin')
})

module.exports = router