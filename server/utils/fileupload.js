import multer from 'multer';
import path from 'path';

export default function multerFileUpload(folderName) {
    const upload_folder = path.join(import.meta.dirname, `/../../client/public/${folderName}/`);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, upload_folder);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const filename = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join('-') + "_" + Date.now();
          
            cb(null, filename + fileExt);        
        }
    });
    
    const upload = multer({
        storage,
        limits: {
            fileSize: 5000000
        },
        fileFilter: (req, file, cb) => {
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                cb(null, true);
            } else {
                cb(new Error('Only PNG, JPG, JPEG file can upload !'));
            }
        }
    });

    return upload;    
}
