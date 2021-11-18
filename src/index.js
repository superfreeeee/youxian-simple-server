const http = require('http');
const path = require('path');
const fs = require('fs');

const baseDirectory = path.resolve('.');
const publicPaths = ['/', '/public'];

// console.log(`[debug] baseDirectory = ${baseDirectory}`);

const searchFile = (targetUrl) => {
  console.log(`[debug] try find ${targetUrl}`);
  for (const publicPath of publicPaths) {
    const p = path.join(baseDirectory, publicPath, targetUrl);
    // 是否匹配目标路径
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      // 目标为目录时，查找 index.html
      if (stat.isDirectory()) {
        const _p = searchFile(path.join(targetUrl, 'index.html'));
        if (_p) {
          return _p;
        }
      } else {
        return p;
      }
    }
  }
  return false;
};

const readFile = (targetPath) => {
  return fs.readFileSync(targetPath);
};

const createServer = (config) => {
  console.log('[debug] createServer config', config);
  const server = http.createServer((req, res) => {
    console.log(`[request] req.url = ${req.url}`);

    const targetUrl = req.url;
    const p = searchFile(targetUrl);
    console.log(`[request] find file = ${p}`);
    if (p) {
      let contentType = 'text/plain';
      if (path.extname(p) === '.html') {
        contentType = 'text/html';
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(readFile(p));
      res.end();
    } else {
      if (path.extname(targetUrl)) {
        res.writeHead(404, 'Not found');
        res.end();
      } else {
        res.end('request success');
      }
    }
  });

  server.listen(config.port);
};

module.exports = createServer;
