import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from "./middleware/app";
import { sequelize } from "./middleware/sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT ?? 3000;
const env = process.env.NODE_ENV ?? 'development'; // Valor por defecto

dotenv.config({ path: path.resolve(__dirname, '..', 'config', `.env.${env}`) });


const main = () => {
  cargarDBSQL();
  cargarExpress();
};

const cargarDBSQL = () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    //sequelize.sync({ force: true });
    console.log("Conexión a la base de datos SQL exitosa.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};




const cargarExpress = () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar servicio :", error);
  }
};

main();
