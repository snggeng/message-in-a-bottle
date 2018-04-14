const config = {
  'production': {
    'PORT': 8080,
    'secret':'message-in-a-bottle',
    'database': 'mongodb://localhost:27017/message-in-a-bottle',
    'options': {
      useMongoClient: true
    }
  },
  'development': {
    'PORT': 3000,
    'secret':'message-in-a-bottle',
    'database': 'mongodb://localhost:27017/dev',
    'options': {
      useMongoClient: true
    }
  },
  'test': {
    'PORT': 3001,
    'secret':'test',
    'database': 'mongodb://localhost/test',
    'options': {
      useMongoClient: true
    }
  }
};


const get = (env) => {
  return config[env] || config.development
}

module.exports = get
