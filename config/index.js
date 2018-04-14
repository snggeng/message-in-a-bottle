const config = {
  'production': {
    'PORT': 8080,
    'secret': process.env.PRODUCTION_SECRET,
    'database': 'mongodb://localhost:27017/message-in-a-bottle',
  },
  'development': {
    'PORT': 3000,
    'secret': process.env.DEVELOPMENT_SECRET,
    'database': 'mongodb://localhost:27017/dev',
  },
  'test': {
    'PORT': 3001,
    'secret': process.env.TEST_SECRET,
    'database': 'mongodb://localhost/test',
  }
};


const get = (env) => {
  return config[env] || config.development
}

module.exports = get
