const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // Esta línea no es necesaria para la conexión
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Otras opciones de conexión si son necesarias
    });
    console.log(`Base de datos conectada: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
    process.exit(1); // Salir del proceso si hay un error de conexión
  }
};

module.exports = connectDB;
