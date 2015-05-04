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
            host: 'localhost',
            port: 6379,
            password: null
        },
        prod: {
            host: process.env.REDIS_HOST || 'localhost' || '<redis host>',
            port: process.env.REDIS_PORT || 6379 || '<redis port>',
            password: process.env.REDIS_PASS || '' ||'<redis password>'
        }
    }
};

module.exports = config;
