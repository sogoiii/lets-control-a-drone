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
    },
    network: {
        internet: {
            ESSID: process.env.INTERNET_ESSID || '',
            wpa2Pass: process.env.WPA2_PASS || ''
        },
        drone: {
            ESSID: process.env.DRONE_ESSID || '',
            desiredIP: process.env.DRONE_DESIRED_IP || '192.168.1.1'
        }
    }
};

module.exports = config;
