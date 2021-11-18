const fs = require('fs');
const path = require('path');
const { DEFAULT_CONFIG_PATH } = require('./config');

let parseError;
const tryParse = (text) => {
  parseError = undefined;
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`[debug] tryParse fail`, e);
    parseError = e;
    return null;
  }
};

const readJsonPackageConfig = () => {
  const text = fs.readFileSync(path.resolve(__dirname, '../package.json'));
  return tryParse(text) || {};
};

const readConfigFile = (customFileName = '') => {
  console.log(`[debug] customFileName = '${customFileName}'`);

  let configPath = path.join('.', customFileName);
  if (!customFileName || !fs.existsSync(configPath)) {
    configPath = DEFAULT_CONFIG_PATH;
  }
  console.log(`[debug] configPath = '${configPath}'`);

  const config = tryParse(fs.readFileSync(configPath));
  if (!config) {
    throw parseError;
  } else {
    return config;
  }
};

const validateConfig = (config) => {
  if (!config || typeof config !== 'object') {
    throw new Error('empty config file');
  }
  if (!config.port) {
    throw new Error(`config scheme mismatch: { port: number }`);
  }
  console.log('[debug] validateConfig success');
  return true;
};

module.exports = {
  readJsonPackageConfig,
  readConfigFile,
  validateConfig,
};
