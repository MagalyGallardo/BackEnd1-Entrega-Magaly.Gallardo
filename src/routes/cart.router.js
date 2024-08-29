import {Router} from "express";
import {cartManager} from "../app.js";

const cartRouter = Router();
cartRouter.post("/", async (req,res)=>{
    try{
        const response = await cartManager.addCart();
        res.json(response)
    }catch (error){
        res.send("Error: crear producto")
        console.log(error);
    }
})
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts().populate("products.product");
        res.json(carts);
    } catch (error) {
        res.status(500).send("Error: obtener los carritos");
        console.log(error);
    }
});
cartRouter.get("/:cid", async (req, res) => {
    let cid = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cid).populate("products.product");
        res.json(cart.products)
    }catch(error){
        res.send("Error: obtener producto")
    }
})
cartRouter.post("/:cid/product/:pid", async (req,res) => {
    let cid=req.params.cid;
    let pid=req.params.pid;
    let quantity=req.body.quantity || 1;

    try{
        const actualizado = await cartManager.addProductsToCart(cid,pid,quantity)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error: actualizar")
        console.log(error);
    }

})
cartRouter.delete("/:cid/product/:pid", async (req,res) => {
    let cid=req.params.cid;
    let pid=req.params.pid;
    
    try{
        const actualizado = await cartManager.deleteProductFromCart(cid,pid)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error: actualizar")
        console.log(error);
    }
})

export {cartRouter};