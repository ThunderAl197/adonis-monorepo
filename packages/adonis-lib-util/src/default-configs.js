const path = require('node:path')
const crypto = require('node:crypto')
const proxyAddr = require('proxy-addr')

module.exports = {
  app: {
    appKey: 'CHANGEME-sample-app-token-' + crypto.randomBytes(8).toString('hex'),
    http: {
      allowMethodSpoofing: false,
      subdomainOffset: 2,
      generateRequestId: false,
      etag: false,
      jsonpCallbackName: 'callback',
      cookie: {domain: '', path: '/', maxAge: 7200, httpOnly: true, secure: false, sameSite: false},
      forceContentNegotiationTo: 'application/json',
      trustProxy: proxyAddr.compile('loopback'),
    },
    logger: {
      name: process.env.APP_NAME,
      enabled: true,
      level: 'info',
      prettyPrint: process.env.NODE_ENV === 'development',
    },
    profiler: {enabled: true, blacklist: [], whitelist: []},
    validator: {},
  },
  bodyparser: {
    whitelistedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    json: {
      encoding: 'utf-8',
      limit: '1mb',
      strict: true,
      types: ['application/json', 'application/json-patch+json', 'application/vnd.api+json', 'application/csp-report'],
    },
    form: {
      encoding: 'utf-8',
      limit: '1mb',
      queryString: {},
      convertEmptyStringsToNull: true,
      types: ['application/x-www-form-urlencoded'],
    },
    raw: {encoding: 'utf-8', limit: '10mb', queryString: {}, types: ['text/*']},
    multipart: {
      autoProcess: true,
      processManually: [],
      encoding: 'utf-8',
      convertEmptyStringsToNull: true,
      maxFields: 1000,
      limit: '20mb',
      types: ['multipart/form-data'],
    },
  },
  cors: {
    enabled: false,
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    headers: true,
    exposeHeaders: ['cache-control', 'content-language', 'content-type', 'expires', 'last-modified', 'pragma'],
    credentials: true,
    maxAge: 90,
  },
  database: {
    connection: 'pg',
    connections: {
      pg: {
        client: 'pg',
        connection: {
          host: process.env.PG_HOST,
          port: process.env.PG_PORT,
          user: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DB_NAME,
        },
        migrations: {naturalSort: true},
        healthCheck: true,
        debug: false,
      },
    },
  },
  drive: {
    disk: 'local',
    disks: {
      local: {
        driver: 'local',
        visibility: 'public',
        root: path.join(process.cwd(), 'tmp/uploads'),
        serveFiles: true,
        basePath: '/uploads',
      },
    },
  },
  hash: {
    default: 'bcrypt',
    list: {
      scrypt: {
        driver: 'scrypt',
        cost: 16384,
        blockSize: 8,
        parallelization: 1,
        saltSize: 16,
        keyLength: 64,
        maxMemory: 33554432,
      },
      argon: {driver: 'argon2', variant: 'id', iterations: 3, memory: 4096, parallelism: 1, saltSize: 16},
      bcrypt: {driver: 'bcrypt', rounds: 10},
    },
  },
}
