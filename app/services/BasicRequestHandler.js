const axios = require('axios');
import { HttpsProxyAgent } from 'https-proxy-agent';

const applicationData = require('../data.json');

const CacheStorage = require('./CacheStorage');
const NoSessionError = require('../../src/Instagram/Domain/errors/NoSessionError');
const InstagramRepository = require('../../src/Instagram/Infrastructure/InstagramRepository');

class BasicRequestHandler {
  static async handle(queryUrl) {
    if (!CacheStorage.get().has('session')) {
      throw new NoSessionError();
    }

    /** @type Session */
    let session = CacheStorage.get().get('session');

    if (session.getExpiryDate() < new Date()) {
      await InstagramRepository.authenticate();
      session = CacheStorage.get().get('session');
    }

    const proxyAgent = new HttpsProxyAgent(
      'http://xizvziax-rotate:nej8ufi4pz29@p.webshare.io:80',
    );

    return new Promise((resolve, reject) => {
      const headers = {
        ...applicationData.headers,
        cookie: `sessionid=${session.getId()}`
      };
      axios.get(queryUrl, {
        headers: headers,
        httpsAgent: proxyAgent,
      }).then(resolve).catch(reject);
    });
  }
}

module.exports = BasicRequestHandler;
