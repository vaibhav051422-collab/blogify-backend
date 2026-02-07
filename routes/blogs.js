const { Router } = require("express");
const router = Router();
router.get('/blog',(req,res)=>{
    return res.render("addblog");

});
module.exports=router;