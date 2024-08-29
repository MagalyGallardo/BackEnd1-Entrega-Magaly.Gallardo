import {Router} from "express";
import ProductModel from "../dao/models/product.model.js";
import { cartManager } from "../app.js";

const viewsRouter = Router();
viewsRouter.get("/products", async (req, res) => {
        
        let page = req.query.page || 1;
        let limit = 3;
        
        const productosLista = await ProductModel.paginate({}, {limit, page});
        const productosListaFinal = productosLista.docs.map(elemento =>{
            const {_id, ...rest} = elemento.toObject();
            return rest
        })
            
        res.render("home",{
            productos: productosListaFinal,
            hasPrevPage: productosLista.hasPrevPage,
            hasNextPage: productosLista.hasNextPage,
            prevPage: productosLista.prevPage,
            nextPage: productosLista.nextPage,
            currentPage: productosLista.page,
            totalPages:productosLista.totalPages
        })
    })
viewsRouter.get("/realtimeproducts", async (req, res) => { 
        res.render("realtimeproducts");    
    }
)
viewsRouter.get("/carts/:cid", async (req, res) => {
    let cid = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cid);
        res.render("cart", { cart: cart.products });
    } catch (error) {
        res.status(500).send("Error: obtener el carrito");
    }
});
export {viewsRouter};