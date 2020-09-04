module.exports = {
  apps: [
    {
      name: "app",
      script: "ts-node -r tsconfig-paths/register ./app.ts",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      namespace: "api",
    },
  ],
};
