export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || 'tj670==SH',
}
