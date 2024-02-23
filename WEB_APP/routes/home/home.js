const express=require('express');
const router=express.Router();

router.get('',(req,res)=>{
    res.status(201).render('welcome');
})
// Added the other routes here until it gets more organized and populated ->.
router.get('/packages',(req,res)=>{
    res.render('list of packages');
})
router.get('/payment',(req,res)=>{
    res.render('payment');
})
router.get('/orientation',(req,res)=>{
    res.render('orientation');
})
module.exports=router;