import {Router} from "express";
import ProductModel from "../dao/models/product.model.js";

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
export {viewsRouter};