# TinyMint Leggings - Next.js Product Page

这是一个基于 Next.js 15 的产品页面项目，完全还原了 TinyMint Store 的 Magic Fleece-Lined Leggings 产品页面。

## 功能特性

- ✅ 完整的产品页面布局
- ✅ 产品图片展示
- ✅ 产品信息（标题、评分、特性）
- ✅ 变体选择（颜色、尺寸、数量）
- ✅ 价格显示
- ✅ 豪华编辑区域（Luxury Editorial）
- ✅ 客户评价轮播
- ✅ 多行内容展示
- ✅ 响应式设计

## 技术栈

- **Next.js 15** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React** - UI 库

## 开始使用

### 安装依赖

```bash
bun install
```

### 开发模式

```bash
bun run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看页面。

### 构建生产版本

```bash
bun run build
```

### 启动生产服务器

```bash
bun run start
```

## 部署到 Vercel

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 项目并配置构建设置
4. 点击部署即可

或者使用 Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 项目结构

```
src/
├── app/
│   ├── globals.css          # 全局样式
│   ├── product-styles.css   # 产品页面样式
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 主页面
│   └── ClientBody.tsx        # 客户端组件包装
├── components/
│   ├── AnnouncementBar.tsx      # 公告栏
│   ├── ProductGallery.tsx       # 产品图片展示
│   ├── ProductInfo.tsx          # 产品信息
│   ├── LuxuryEditorial.tsx      # 豪华编辑区域
│   ├── ImageSlider.tsx         # 图片轮播
│   ├── MultiRow.tsx            # 多行内容
│   ├── Testimonials.tsx        # 客户评价
│   └── TestimonialsSection.tsx # 评价区域
└── lib/
    └── utils.ts              # 工具函数
```

## 注意事项

- 图片资源来自 `tinymintstore.com`，已配置在 `next.config.js` 中
- 所有样式已从原始 HTML 提取并转换为 CSS
- 组件使用 React Server Components 和 Client Components 混合模式
- 响应式设计支持移动端和桌面端

## 许可证

MIT
