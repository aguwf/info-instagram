class InstagramHelper {
  static BASE_URL = 'https://www.instagram.com/';
  static AUTH_URL = 'https://www.instagram.com/accounts/login/ajax/';
  static DEFAULT_USER_AGENT = '5.0+(iPhone%3B+CPU+iPhone+OS+14_8+like+Mac+OS+X)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)+Version%2F14.1.2+Mobile%2F15E148+Safari%2F604.1';

  static #ENCRYPTED_PASSWORD_TEMPLATE = '#PWD_INSTAGRAM_BROWSER:0:%TIME%:%PASSWORD%'

  static storage = new Map();

  /**
   * @param {string} password
   * @returns {string}
   */
  static getEncryptedPasswordFromPassword(password) {
    const currentDate = new Date();
    const unixTimestamp = Math.round(currentDate.getTime() / 1000);
    return this.#ENCRYPTED_PASSWORD_TEMPLATE
      .replace('%TIME%', unixTimestamp.toString())
      .replace('%PASSWORD%', password);
  }
}

module.exports = InstagramHelper;
