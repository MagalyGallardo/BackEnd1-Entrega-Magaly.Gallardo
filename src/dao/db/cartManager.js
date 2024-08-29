import CartModel from "../models/cart.model.js";
class CartManager {
    addCart = async () =>{
        try{
            const newCart = new CartModel({products:[]});
            await newCart.save()
            return newCart
        }
        catch(error){
            console.log("Error: crear un carrito", error);
            throw error;
        }}
    getCartById = async (cid) => {
        try{
            const cartFound = await CartModel.findById(cid)
            if(!cartFound){
                console.log("Producto No Encontrado");
                return null;
            }else{
                return cartFound;
            }
        }catch(error){
            console.log("Error: cargar los carritos", error);
            throw error;    
        }}
    addProductsToCart = async(cid,pid,quantity=1) => {
        try{
            const cart = await this.getCartById(cid);
            const existProduct = cart.products.find(element => element.product.toString() === pid)
            if(existProduct){
                existProduct.quantity += quantity
            } else{
                cart.products.push({product: pid, quantity})
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        }catch(error){
            console.log("Error: agregar productos al carrito", error); 
            throw error;   
        }    

    }

    deleteProductFromCart = async (cid, pid) => {
        try {
            const cart = await this.getCartById(cid);
            const cartIndex = cart.findIndex(element => element.id === cid);
        if (cartIndex === -1) {
            throw error;
        }
            const updatedProducts = cart[cartIndex].products.filter(product => product.id !== pid);
            cart[cartIndex].products = updatedProducts;

        if (cart[cartIndex].products.length === 0) {
            cart.splice(cartIndex, 1);
        }    
    
        await cart.save();

        return cart[cartIndex];
        } catch (error) {
            console.log("Error: eliminar productos", error); 
            throw error; 
        }}
}
export {CartManager}