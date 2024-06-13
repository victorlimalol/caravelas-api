// Incluir as bibliotecas
// Upload de arquivos
import multer from "multer";

// Configuração do upload da imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/estabelecimento');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const validExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
    if (validExtensions.includes(file.mimetype)) {
        cb(null, file);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
