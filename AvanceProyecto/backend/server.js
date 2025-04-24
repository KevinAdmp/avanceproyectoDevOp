require("dotenv").config();
const express = require ('express');
const cors = require('cors');
const mongoose = require("mongoose");

const productoRoutes = require("./routes/productoRoutes");
const authRoutes = require("./routes/authRoutes");



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("✅ Conectado a la base de datos"))
.catch(err=>console.error("❌ Error en la conexión", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
