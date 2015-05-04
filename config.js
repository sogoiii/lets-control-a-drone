var config = {
    ports: {
        slave: process.env.PORT_SLAVE || 3000,
        master: process.env.PORT_MASTER || 7000,
        drone: process.env.PORT_DRONE || 6000,
    },
    timeout: {
        startup: 2000,
        update: 5000,
    },
    environment: process.env.environment || 'dev',
    redis: {
        dev: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
            password: process.env.REDIS_PASS || ''
        },
        prod: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS
        }
    }
};

module.exports = config;
