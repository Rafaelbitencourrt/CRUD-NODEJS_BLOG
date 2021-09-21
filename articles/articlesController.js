

const express = require('express');
const router = express.Router();

router.get('/artigos', (req, res)=>{
    res.send('Rota para artigos')
})
router.get('/admin/artigos', (req, res)=>{
    res.send('Rota para artigos do admin')
})

module.exports = router