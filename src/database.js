import mongoose from "mongoose";

mongoose.connect("mongodb+srv://MagalyGallardo:coder@cluster0.dkk5e.mongodb.net/tienda_deportes?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Yes! Conectado!"))
    .catch((error) => console.log("Huston! Tenemos un error: ", error))
