module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: 'public',
  synchronize: true,
  autoLoadEntities: true,
  entities: ['dist/src/entity/**/*.js'],
  migrations: ['dist/src/migration/*.js'],
  seeds: ['dist/src/seeds/*.js'],
  cli: {
    migrationsDir: './src/migration',
  },
  extra: {
    ssl: process.env.DB_SSL === 'true',
  },
};
