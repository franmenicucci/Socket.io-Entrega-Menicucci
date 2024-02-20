import express from 'express';

const router = express.Router();
router.get ('/', (req,res)=>{
    res.render('index', {}) //renderizar solo la vista por el momento y no el objeto
} )

export default router;