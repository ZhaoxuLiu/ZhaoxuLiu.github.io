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

## About Me 整段编辑

在 profile.js 中找到“About Me 整段编辑区”。整个 About Me 只读取 `about` 这一块文字：

```js
about: `
在这里填写你的第一段完整介绍。

在这里填写第二段研究兴趣或个人背景。

联系方式也直接写在这里，例如 name@example.com。
`,
```

你可以一次粘贴完整介绍，自由增删和调整段落；空一行就会另起一段，同一段内的普通换行会合并成空格。正文中的邮箱会自动变成可点击的邮件链接。删除整段内容时，主页会隐藏 About Me 栏目。

两端的反引号和最后的逗号请保留。这个编辑区可以直接写普通双引号，无需转义；若正文包含反引号，需在前面加反斜杠，若需要原样写 `${`，同样在美元符号前加反斜杠。

About Me 现在完全由你写出的文字决定。修改侧栏的 role、department、institution、email 或 researchInterests，不会再自动添加或改写简介中的句子。侧栏、Research Interests 和 CV 仍使用各自原有的结构化资料；需要更新这些位置时，请修改对应字段。

## 字段说明

| 字段 | 填什么 | 展示位置 |
| --- | --- | --- |
| name | 网站显示姓名，可使用中文 | 主页、CV、浏览器标题 |
| role | 真实身份，例如 Master's Student | 主页侧栏、CV |
| department / institution | 院系与学校全称 | 主页侧栏、CV |
| location / email | 城市国家、愿意公开的邮箱 | 主页、CV |
| photo | 上传后的照片路径，如 assets/portrait.jpg；可留空 | 主页 |
| links | 各平台的完整 HTTPS 个人主页地址 | 主页、CV |
| about | 一整块完整简介；用空行分段 | 主页 About Me |
| researchInterests | 三个简洁研究关键词 | 主页 Research Interests、CV |
| news | 日期与新闻，最近的在前 | 仅主页 |
| publications | 论文记录，按希望展示的顺序填写 | 主页、CV、复制引用 |
| education | 学校、学位、专业和就读时间，最近的在前 | 主页与 CV 的 Education |
| researchExperience | 科研、实习或工作经历 | CV 的 Experience；showOnHomepage: true 时也出现在主页 Experience |
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
- authors：严格按实际作者顺序填写全部作者，人数不限；本人署名加 me: true，不会改变排序。
- 作者 name 应与论文署名完全一致，不随网站显示姓名自动改变。
- year / venue：年份与期刊、会议或预印本平台。
- paperUrl / projectUrl：论文链接、项目地址；没有项目就留空字符串。
- image：可选的配图路径，没有就留空字符串。

新增论文：在 publications 的方括号内复制一整条花括号记录，记录之间用英文逗号分隔。主页、CV 和每篇论文的 Copy citation 都会同步更新。

主页与 CV 共用同一套无边框的论文排版。作者不超过 6 位时直接显示全部姓名；超过 6 位时，默认显示前三位、所有标有 me: true 的本人署名以及最后一位，中间省略部分用省略号标记，实际顺序始终不变。鼠标停在精简名单的本人姓名上可查看真实位次，点击 Show all … authors 可展开完整名单，再次点击可收起。打印或另存为 PDF 时保持精简名单。完整作者信息仍保存在资料文件中，复制引用始终使用全部作者。

每篇论文只需填写标题、作者、年份、发表平台和链接；不再填写 type、summary 或 status。配图 image 是可选项，没有配图时卡片会以纯文字排版。

### 教育、科研经历与空栏目

每条记录包含 period（时间）、title（学位/职位）、organization（机构）、location（地点）、details（补充说明列表）。教育经历在主页和 CV 中共用排版；科研经历的 details 在 CV 中排成项目列表，在主页中使用简洁段落。

教育记录可选填 logo（校徽图片路径），例如：

```js
education: [
  {
    period: "2024 — 2028(expected)",
    title: "B.Eng, Artificial Intelligence",
    organization: "Jilin University",
    logo: "assets/jilin-university.gif",
    location: "Changchun, China",
  },
],
```

校徽显示在学校信息左侧，主页与 CV 自动同步；手机端会把时间移到学校名称下方。新增学校时，上传对应图片后修改该条记录的 logo；留空或删除 logo 字段即可使用无校徽排版，不需要改 HTML。图片加载失败时会自动隐藏校徽并收回占位。

吉林大学校徽来自[吉林大学官网的校徽页面](https://www.jlu.edu.cn/info/1010/7275.htm)，资源保存在 assets/jilin-university.gif，不依赖外部图片链接。

details 中需要给导师姓名添加链接时，使用 `[姓名](完整网址)`，例如：

```js
details: ["Advisor: Prof. [Qinggang Zhang](https://qing145.github.io/) · Research group: DEEP Lab"],
```

主页和 CV 会同步显示可点击的姓名。只支持这种简单的 HTTP/HTTPS 链接写法，不需要填写 HTML；其他文字保持原样。

科研经历默认仅显示在 CV；需要在主页也显示时改成 showOnHomepage: true。

Education 与 Experience 是两个独立栏目，均按各自列表的填写顺序展示。教育记录只放在 education 中；科研、实习或工作记录放在 researchExperience 中，不会再混入教育栏目。主页顺序为 Education、Experience、Awards；对应列表为空时，该栏目与导航入口会自动隐藏。

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

- 普通字段只改英文双引号中的文字，使用英文直引号，不用中文弯引号。
- 普通字段中的双引号要写成反斜杠加引号：`\"`，不能直接在双引号字符串内换行。About Me 的反引号编辑区支持直接换行与普通双引号，填写方式见上文。
- 不要漏掉记录之间的英文逗号。
- 已安装 Node.js 时，可运行 `node --check profile.js` 检查语法。
- 字段不要填 HTML 标签；details 除普通文字外支持上文的 `[姓名](https://...)` 链接写法。
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
