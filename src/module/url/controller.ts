import { Request, Response } from "express";
import { urlService } from "../url/service";

const getUrl = async (req: Request, res: Response) => {
  try {
    const { urlShort } = req.body;
    const urls = await urlService.getUrlByIdShort(urlShort);
    if (!urls) {
      res.status(404).json({ message: "Url not found" });
    } else {
      res.status(200).json(urls);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUrls = async (req: Request, res: Response) => {
  try {
    const urls = await urlService.getUrl();    
    if (!urls) {
      res.status(404).json({ message: "Url not found" });
    } else {
      res.status(200).json(urls);
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUrl = async (req: Request, res: Response) => {
  try {
    const {urlOriginal} = req.body;
    const urls = await urlService.getUrlByIdShort(urlOriginal);     
    if (urls) {
      res.status(500).json({ message: "Url already exists " });
    } else {
      const url = await urlService.createUrl(urlOriginal);
      res.status(201).json({ message: "Url create" ,url});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteUrl = async (req: Request, res: Response) => {
   try {
    const { idUrl } = req.params;
    const user = await urlService.deleteUrl(idUrl);
    if (!user) {
      res.status(404).json({ message: "Url not found" });
    } else {
      res.status(200).json({ message: "Url delete" ,user});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUrl = async (req: Request, res: Response) => {
  try {
    const { idUrl } = req.params;
    const { urlOriginal, urlShort, stateUrl, countClick } = req.body;    
    const user = await urlService.updateUrl( idUrl, urlOriginal, urlShort, stateUrl, countClick );
    if (!user) {
      res.status(404).json({ message: "Url not found" });
    } else {
      res.status(200).json({ message: "Url update" ,user});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  } 
};



export const urlController = {
  getUrl,
  getUrls,
  createUrl,
  deleteUrl,
  updateUrl
};