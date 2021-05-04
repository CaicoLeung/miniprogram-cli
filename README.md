# miniprogram-cli

CaicoLeung/gulp-wechat-miniprogram项目的脚手架

## 特性和使用说明

  点击查看: [gulp-wechat-miniprogram](https://github.com/CaicoLeung/gulp-wechat-miniprogram)

## 开始使用

- 安装

    ```bash
    yarn global add gulp-miniprogram-cli
    ```

    ```bash
    npm install -g gulp-miniprogram-cli
    ```

- 创建Page, 在app/pages下创建Page文件, 并自动在app.json添加pages本次路径

    ```bash
    mp-cli -p home
    mp-cli --page home
    ```

- 创建Component,  在app/components下创建Component文件

    ```bash
    mp-cli -c button
    mp-cli --comp button
    ```

- 初始化项目

    ```bash
    mp-cli init
    ```

- 查看版本

    ```bash
    mp-cli --version
    ```

- 查看帮助

    ```bash
    mp-cli --help
    ```
