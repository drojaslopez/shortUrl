import{Router} from "express";
import { urlController } from "./controller";
//import { verifyToken } from "../../middleware/jwt";

const route = Router();

//route.use(verifyToken)

// leer los link
route.get("/ALL", urlController.getUrls);

// leer un único link por id
route.get("/", urlController.getUrl);

// crear un link
route.post("/", urlController.createUrl); 

// eliminar un link por id
route.delete("/:idUrl", urlController.deleteUrl);

// editar un link por id
route.put("/:idUrl", urlController.updateUrl);

export default route;