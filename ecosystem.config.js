module.exports = {
  apps: [
    {
      name: 'app',
      script: 'index.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 2,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      wait_ready: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
