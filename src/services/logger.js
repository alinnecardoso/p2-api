const axios = require('axios');
require('dotenv').config();

const LOG_STREAM_URL = process.env.LOG_STREAM_URL;
const LOG_STREAM_TOKEN = process.env.LOG_STREAM_TOKEN;

class Logger {
  static async log(level, message, metadata = {}) {
    const logEntry = {
      dt: new Date().toISOString(),
      level,
      message,
      ...metadata,
      environment: process.env.NODE_ENV || 'development'
    };

    // Sempre loga no console
    console.log(JSON.stringify(logEntry, null, 2));

    // Tenta enviar para o Better Stack se a URL e token estiverem configurados
    if (LOG_STREAM_URL && LOG_STREAM_TOKEN) {
      try {
        await axios.post(LOG_STREAM_URL, logEntry, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LOG_STREAM_TOKEN}`
          }
        });
      } catch (error) {
        console.error('Erro ao enviar log para Better Stack:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.message,
          url: LOG_STREAM_URL
        });
      }
    } else {
      console.log('LOG_STREAM_URL ou LOG_STREAM_TOKEN não configurados. Logs serão exibidos apenas no console.');
    }
  }

  static info(message, metadata = {}) {
    return this.log('info', message, metadata);
  }

  static error(message, metadata = {}) {
    return this.log('error', message, metadata);
  }

  static warn(message, metadata = {}) {
    return this.log('warn', message, metadata);
  }

  static debug(message, metadata = {}) {
    return this.log('debug', message, metadata);
  }
}

module.exports = Logger; 