import express from "express";
import {engine} from "express-handlebars";
import {ProductManager} from "./dao/db/productManager.js";
import {CartManager} from "./dao/db/cartManager.js";
import {productsRouter} from "./routes/products.router.js";
import {cartRouter} from "./routes/cart.router.js";
import {viewsRouter} from "./routes/views.router.js";
import {Server} from "socket.io"
import "./database.js" 

const app = express();
const PUERTO = 8080;
const productManager = new ProductManager ();
const cartManager = new CartManager ();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"))

//Configuracion Express Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//Servidor
const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });
const io = new Server(httpServer);
io.on("connection", async (socket) =>{
  const queryParams = {};
  socket.on('message', (data) => {
    console.log(`Cliente ${data} conectado`)
});

  socket.emit("products", await productManager.getProducts({}));

  socket.on("deleteProduct", async (productId) => {
    console.log("Id recibido", productId);
    productManager.deleteProduct(productId);
    socket.emit("products", await productManager.getProducts());
    console.log("Productos actualizados");
});
  socket.on("productForm" , async (data) => {
    const { title, description, price, thumbnail, code, stock, category, status } = data;
    if (!category || status === undefined) {
      console.log("Completar datos obligatorios");
      return;
  }
    await productManager.addProduct({ title, description, price, thumbnail, code, stock, category, status });
    socket.emit("products", await productManager.getProducts());
    console.log("Productos actualizados");
  });
  
})
export {productManager, cartManager}