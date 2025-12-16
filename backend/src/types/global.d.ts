
export {}
declare global {
    // Env Variables
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV : 'development'|
            'production' | 'testing'
            PORT : string
            // DATABASE
            MONGO_URI : string
            AUTH_TOKEN : string
        }
    }
}