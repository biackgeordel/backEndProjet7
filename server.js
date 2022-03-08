
const app=require('./app');
const http=require('http');
const server=http.createServer(app);
const port=process.env.port||3000;

const errorHandler=error=>{
    const adress=server.address();
    
    if(error.syscall !=='listen'){
        throw error;
    }
    switch(error.code){
        case 'EACCESS':
            console.error(adress+':necessite une autorisation ');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`le port: ${port} est déja utilsé par un autre serveur`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};
//Event pour intercepter les erreurs au niveau du serveur
server.on('error',errorHandler);
server.on('listening',()=>console.log(server.address()));


server.listen(port,()=>{
    console.log(`le server listen le port ${port}`);
});