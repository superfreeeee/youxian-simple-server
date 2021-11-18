# @youxian/simple-server

- author: 幽闲

## Usage 基本使用

- Install

```bash
yarn add @youxian/simple-server -D
```

- add command to `package.json`

```json
{
  "scripts": {
    "start": "server"
  }
}
```

## Advanced Usage: 进阶使用(With nodemon)

- Install

```bash
yarn add nodemon -D
```

- update command in `package.json`

```json
{
  "scripts": {
    "start": "nodemon --exec 'serve'"
  }
}
```

## Feature 功能说明

启动一个简易 http 服务器，单纯返回静态资源（主要返回 `index.html`）

与 @youxian/cli 的原生程序版本配套使用

## API 说明

- bin

`serve` 指令，全局安装的时候可在任意目录下使用指令

```bash
# in npm
npm i -g @youxian/simple-server
# in yarn
yarn global add @youxian/simple-server
```

- parameters

```bash
Usage: serve [options]

Options:
  -v, --version          output the version number
  -f, --filename <path>  custom config filename,
                         default to server.config.json
  -h, --help             display help for command
```

`-f, --filename <path>` 参数接受传入自定义的配置文件，默认为 `server.config.json`

- 静态资源查找路径

默认情况下下列目录将作为静态资源查找顺序

```
/
/public
```


<!-- create by @youxian/cli -->
