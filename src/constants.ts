// domain settings
export const DOMAIN_NAME = process.env.DOMAIN_NAME;
export const SERVER_PORT = 3000;

// jwt settings
export const JWT_SECRET = process.env.JWT_SECRET;

// database settings
export const DBMS_NAME = 'mysql';
export const DBSERVER_HOST = 'localhost';
export const DBSERVER_PORT = 3306;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = 'tetris';

// mailing settings
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_DEFAULTS_FROM = process.env.MAIL_DEFAULTS_FROM;

// mailing queue settings
export const MAIL_REDIS_HOST = 'localhost';
export const MAIL_REDIS_PORT = 6379;
