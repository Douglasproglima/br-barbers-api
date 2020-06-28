module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'br_barbers_api',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
