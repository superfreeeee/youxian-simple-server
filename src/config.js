const path = require('path');

const DEFAULT_CUSTOM_CONFIG_FILENAME = 'server.config.json'; // 默认自定义配置文件名
const DEFAULT_CONFIG_PATH = path.resolve(__dirname, '../server-default.config.json'); // 默认自定义配置文件

module.exports = {
  DEFAULT_CUSTOM_CONFIG_FILENAME,
  DEFAULT_CONFIG_PATH,
};
