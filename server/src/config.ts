import 'dotenv/config'
import convict from 'convict'

export const config = convict({
  database: {
    host: {
      doc: 'The postgresql host',
      env: 'ASTEA_SCHOOL_DB_HOST',
      type: '*',
      default: 'localhost',
    },
    port: {
      doc: 'The postgresql port',
      env: 'ASTEA_SCHOOL_DB_PORT',
      type: '*',
      default: 5432,
    },
    username: {
      doc: 'The postgresql username',
      env: 'ASTEA_SCHOOL_DB_USERNAME',
      type: '*',
      default: 'postgres',
    },
    password: {
      doc: 'The postgresql password',
      env: 'ASTEA_SCHOOL_DB_PASSWORD',
      default: 'password'
    },
    name: {
      doc: 'The postgresql database name',
      env: 'ASTEA_SCHOOL_DB_NAME',
      type: '*',
      default: 'books'
    },
    testName: {
      doc: 'The postgresql database name for the automated tests',
      env: 'ASTEA_SCHOOL_DB_TEST_NAME',
      type: '*',
      default: 'books_test'
    }
  },
  jwtSecret: {
    doc: 'The JWT secret used to generate the token',
    env: 'ASTEA_SCHOOL_JWT_SECRET',
    type: '*',
    default: ''
  }
})

config.validate()
