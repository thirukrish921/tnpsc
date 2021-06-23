require('dotenv').config();

CONFIG = {};

CONFIG.app = process.env.APP || 'local';
CONFIG.port = process.env.PORT || '5000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'seconddb';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'Password1234';

CONFIG.max_pool_conn = process.env.MAX_POOL_CONN || '100';
CONFIG.min_pool_conn = process.env.MIN_POOL_CONN || '0';
CONFIG.conn_idle_time = process.env.CONN_IDLE_TIME || '10000';
