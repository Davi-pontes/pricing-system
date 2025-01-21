import multer from "multer";
import path from "path"

export const storage = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null, path.resolve("uploads"))
    },
    filename:(req,file,callback) => {
        const time = new Date().getTime()
        
        callback(null,`${time}-${file.originalname}`)
    }
})

export const uploadXlsx = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls') {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
});