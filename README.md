# 学术主页与 CV 使用说明

主页：https://zhaoxuliu.github.io/

在线 CV：https://zhaoxuliu.github.io/cv.html

## 修改一次，两页同步

所有个人资料都在 **profile.js**。主页和在线 CV 会读取同一份资料，不需要分别维护。

这不是访客可编辑的后台：你登录 GitHub 后，在 GitHub 网页修改资料，普通访客只能查看。

1. 打开仓库中的 profile.js，点击铅笔图标（Edit this file）。
2. 按中文注释修改资料，保留英文引号、逗号和括号。
3. 点击 Commit changes，填写说明，提交到 main。
4. 等待仓库 Actions 中的 Pages 部署完成。
5. 刷新主页和 CV；仍显示旧内容时使用 Ctrl+F5。

[直接编辑资料](https://github.com/ZhaoxuLiu/ZhaoxuLiu.github.io/edit/main/profile.js)

不要再分别修改 index.html / cv.html 里的个人资料，它们现在仅负责页面结构。

## 字段说明

| 字段 | 填什么 | 展示位置 |
| --- | --- | --- |
| name | 网站显示姓名，可使用中文 | 主页、CV、浏览器标题 |
| role | 真实身份，例如 Master's Student | 主页、CV、简介首句 |
| department / institution | 院系与学校全称 | 主页、CV、简介首句 |
| location / email | 城市国家、愿意公开的邮箱 | 主页、CV |
| photo | 上传后的照片路径，如 assets/portrait.jpg；可留空 | 主页 |
| links | 各平台的完整 HTTPS 个人主页地址 | 主页、CV |
| about.focus / about.background | 研究问题、个人背景简介 | 主页 |
| researchInterests | 三个简洁研究关键词 | 主页、CV、简介研究方向句子 |
| news | 日期与新闻，最近的在前 | 仅主页 |
| publications | 论文记录，按希望展示的顺序填写 | 主页、CV、复制引用 |
| education | 教育经历，最近的在前 | 主页、CV |
| researchExperience | 科研经历 | CV；showOnHomepage: true 时也出现在主页 |
| skills | 技能，没有就写 [] | 仅 CV |
| awards | 获奖经历；没有就写 [] | 主页、CV |
| lastUpdated | 更新月份，如 Oct 2026 | 两页 |
| templatePreview | 真实资料填完后将 true 改为 false | 隐藏模板提示 |

当前任职学校和过去教育记录是不同事实，请分别维护；每一条教育记录只需填写一次，会同步到两页。

### 三个研究方向

```js
researchInterests: ["方向一", "方向二", "方向三"],
```

主页显示三个并列词语，CV 显示同样的词语。

### 论文填写规则

- title：完整标题。
- authors：严格按实际作者顺序填写；本人署名加 me: true，仅用于加粗，不会改变排序。
- 作者 name 应与论文署名完全一致，不随网站显示姓名自动改变。
- type：Survey / Review / Research Article 等。
- year / venue：年份与期刊、会议或预印本平台。
- status：Preprint / Accepted 等真实状态；正式发表也可以留空。
- summary：一句话客观概括论文，不夸大个人贡献。
- paperUrl / projectUrl：论文链接、项目地址；没有项目就留空字符串。
- image：可选的配图路径，没有就留空字符串。

新增论文：在 publications 的方括号内复制一整条花括号记录，记录之间用英文逗号分隔。主页、CV 和每篇论文的 Copy citation 都会同步更新。

### 教育、科研经历与空栏目

每条记录包含 period（时间）、title（学位/职位）、organization（机构）、location（地点）、details（补充说明列表）。CV 将 details 排成项目列表，主页使用简洁段落。

科研经历默认仅显示在 CV；需要在主页也显示时改成 showOnHomepage: true。

没有内容时使用空列表，标题也会自动隐藏：

```js
researchExperience: [],
awards: [],
news: [],
```

正式模式（templatePreview: false）会隐藏没填写地址的社交链接。CV 链接始终在侧栏最后。

## PDF 导出

打开在线 CV，点击 Print / Save PDF，在打印窗口选择“另存为 PDF”。建议用 A4，关闭浏览器自带页眉页脚；页面按钮和导航不会打印。

**自动更新的是在线 CV，不是已下载的 PDF。** 网站更新后请重新导出最新 PDF。目前没有自动生成或托管 cv.pdf。

## 常见问题

- 只改引号中的文字，使用英文直引号，不用中文弯引号。
- 文本中的双引号要写成反斜杠加引号：`\"`。不要在同一个字符串内直接换行。
- 不要漏掉记录之间的英文逗号。
- 已安装 Node.js 时，可运行 `node --check profile.js` 检查语法。
- 字段只接受纯文本，不要填 HTML 标签。
- 链接用完整 https:// 地址；照片路径须与已上传文件一致，注意大小写。
- 页面空白或提示 Profile could not be loaded 时，检查 profile.js 的引号、括号、逗号。
- GitHub 文件 History 可查看旧版本，误改后可以恢复内容。
- 网站和提交历史公开，请勿填写密码、令牌、身份证号、家庭地址等私密信息。

## 文件与本地预览

- profile.js：唯一资料入口，日常只改它。
- profile-render.js：共用排版逻辑。
- index.html / cv.html：页面结构。
- styles.css：样式与打印规则。
- script.js：菜单、链接提示、引用复制。
- .nojekyll：静态发布标记，请保留。

直接打开 index.html / cv.html 即可预览，也可用任意静态服务器。无需数据库、登录后台或构建步骤，页面内容需要浏览器启用 JavaScript。
