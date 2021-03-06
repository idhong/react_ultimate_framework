module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'react_ultimate_framework',
            script: 'release/server.js',
            instances: 2,
            error_file: "./logs/app-err.log",//错误输出日志
            out_file: "./logs/app-out.log",  //日志
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'claude',
            host: [
                {
                    "host": "localhost",
                    "port": "22"
                }
            ],
            ref: 'origin/master',
            repo: 'git@github.com:wuyanwuyan/react_ultimate_framework.git',
            path: '/Users/claude/Desktop/react_ultimate_framework',
            "post-setup": "ls -la",
            'post-deploy': 'yarn install --production=false && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
            env: {
                "NODE_ENV": "production"
            }
        },
        dev: {
            user: 'claude',
            host: [
                {
                    "host": "localhost",
                    "port": "22"
                }
            ],
            ref: 'origin/master',
            repo: 'git@github.com:wuyanwuyan/react_ultimate_framework.git',
            path: '/var/www/dev/react_ultimate_framework',
            'post-deploy': 'yarn install --production=false && npm run build && pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev'
            }
        }
    }
};

// 第一次部署，要 pm2 deploy ecosystem.config.js production setup
