var config = {
    redis: {
        dev: {
            host: 'localhost',
            port: 6379,
            password: null
        },
        prod: {
            host: '<redis host>',
            port: <redis port>,
            password: '<redis password>'
        }
    }
};

module.exports = config;
