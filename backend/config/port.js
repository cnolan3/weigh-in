const config = {
  production: {
    port: 8080
  },
  development: {
    port: 4000
  }
}
exports.get = function get(env) {
  return config[env] || config.development;
}
