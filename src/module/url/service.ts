import { UrlLink } from "./schema";
import { nanoid } from 'nanoid';


const getUrl = async () => {
  try {
    const Urls = await UrlLink.findAll();
    return Urls;
  }
  catch (error) {
    console.error("Error in getUrl:", error);
    throw new Error("Url not found");
  }
};

const getUseById = async (id: string) => {
  try {
    const UrlSelect = await UrlLink.findByPk(id);
    return UrlSelect;
  } catch (error) {
    console.error("Error in getUseById:", error);
    throw new Error("Url not found");
  }
};

const getUrlByIdShort = async (idUrlFind: string) => {
  const path_url = process.env.PATH_URL ?? "prueba/";
  const urlShortSanited = idUrlFind.replace(path_url ?? "", "");
  try {
    const UrlSelect = await UrlLink.findOne({ where: { idUrl: urlShortSanited } });
    //aumentar el contador de clicks
    if (UrlSelect !== null) {
      await UrlLink.update(
        { countClick: UrlSelect.countClick + 1 },
        { where: { idUrl: urlShortSanited } }
      );
    }
    return UrlSelect;
  } catch (error) {
    console.error("Error in getUrlByIdShort:", error);
    throw new Error("Url not found");
  }
};


const createUrl = async (urlOriginal: string) => {
  try {
    const path_url = process.env.PATH_URL ?? "prueba/";
    // Genera un ID único y corto
    const idUrl = nanoid(10);
    // Genera un url único y corto
    const urlShort = path_url + idUrl;
    const stateUrl = 1; //0 disable 1 enable
    const countClick = 0;
    return await UrlLink.create({ idUrl, urlOriginal, urlShort, stateUrl, countClick });
  } catch (error) {
    console.error("not create:", urlOriginal);
    console.error("not create:", error);
    throw new Error(" not create");
  }
};

const deleteUrl = async (id: string) => {
  try {
    const userSelect = await UrlLink.findByPk(id);
    await userSelect?.destroy();
    return userSelect;
  } catch (error) {
    console.error(" not delete:", error);
    throw new Error(" not delete:");
  }
};


const updateUrl = async (idUrl: string, urlOriginal: string, urlShort: string, stateUrl: number, countClick: number) => {
  try {
    const updated = await UrlLink.update(
      { urlOriginal, urlShort, stateUrl, countClick },
      { where: { idUrl }, individualHooks: true }
    );
    if (updated[0] === 0) {
      throw new Error("Url does not exists");
    }
    return await UrlLink.findByPk(idUrl);

  } catch (error) {
    console.error("not create:", idUrl);
    console.error("not create:", error);
    throw new Error(" not create");
  }
};




export const urlService = {
  createUrl,
  getUseById,
  getUrl,
  getUrlByIdShort,
  deleteUrl,
  updateUrl
};
