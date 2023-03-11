module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  port: 9000,
  cors: {
    origins: ["https://web-iv-2223-frontend-web-yani-degrande.onrender.com"],
    maxAge: 3 * 60 * 60, // 3h in seconds
  },
  database: {
    client: "mysql2",
    host: "DATABASE_HOST",
    port: "DATABASE_PORT",
    name: "DATABASE_NAME",
  },
};
