//? Dependencies 

require('dotenv').config()

const config ={
    port:  process.env.PORT || 9000,
    nodeEnv: process.env.NODE_ENV || 'development', //? DEsarrollo, testing, produccion
    jwtSecret: process.env.JWT_SECRET,
    db:{
        host: process.env.HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'root',
        dbName : process.env.DB_NAME

    }
}

module.exports = config