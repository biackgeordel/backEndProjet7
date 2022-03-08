
 const multer=require('multer');
 const MIME_TYPES={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png',
    'image/webp':'webp',
    'image/gif':'gif'
    
    };
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            let dossier="";
            let chemin="";
            if(req.body.message){
                dossier=`${(JSON.parse(req.body.message)).dossier}/message`
            }else if(req.body.user){
                dossier=`${(JSON.parse(req.body.user)).dossier}//avatar`
                console.log(dossier); 
            }
           
            chemin=`./images/${dossier}`
              cb(null,`${chemin}`);     
                 
        },
        filename:(req,file,cb)=>{
            const extension=MIME_TYPES[file.mimetype];
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
             cb(null, file.fieldname + '-' + uniqueSuffix +'.'+extension)

        }
    });
   module.exports=multer({storage:storage}).single('image');
    