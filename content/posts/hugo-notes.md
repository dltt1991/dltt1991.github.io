---
title: "Hugo 快速入门笔记"
date: 2026-04-24
tags: ["note", "hugo"]
---

记录 Hugo 的基础用法。

## 安装

```bash
snap install hugo
```

## 创建站点

```bash
hugo new site myblog
cd myblog
```

## 本地预览

```bash
hugo server -D
```

访问 http://localhost:1313 查看效果。

## 构建

```bash
hugo --minify
```

生成的静态文件在 `public/` 目录。
