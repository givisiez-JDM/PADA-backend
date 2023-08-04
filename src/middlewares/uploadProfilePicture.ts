import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de tamanho do arquivo (10MB)
});

export const uploadPictureMiddleware = upload.single('file');