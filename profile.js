// 唯一的个人资料入口：修改这里，主页与在线 CV 会一起更新。
// About Me：只改下方 about 的两端反引号之间的整段文字，空一行分段。
// 其它字段：只改引号内文字；多条记录用英文逗号分隔。详细说明见 README.md。
// 此文件会公开，请勿填写密码、身份证号、家庭住址等私密信息。
window.ACADEMIC_PROFILE = {
  // 所有占位内容换成真实资料后改为 false，隐藏模板提示。
  templatePreview: true,
  lastUpdated: "Oct 2026",

  name: "Zhaoxu Liu",
  role: "Undergraduate Student · Researcher",
  department: "School of Artificial Intelligence",
  institution: "Jilin University",
  location: "Changchun, China",
  email: "zhaoxvliu@gmail.com",
  photo: "", // 先上传照片，例如 assets/portrait.jpg，再填这个路径。

  // 空字符串表示尚未填写；正式模式下会自动隐藏没有地址的链接。
  links: {
    scholar: "https://scholar.google.com/citations?user=Ot1NMrsAAAAJ",
    github: "https://github.com/ZhaoxuLiu",
    orcid: "https://orcid.org/0009-0002-6983-2510",
    linkedin: "https://www.linkedin.com/in/zhaoxv-liu-629556390/",
    x: "https://x.com/zhaoxvliu",
  },

  // ==================== About Me 整段编辑区 ====================
  // 在两端反引号之间直接写完整介绍，可以粘贴多行文字，空一行分段。
  // 这块文字完全由你控制；姓名、身份、学校、研究方向、邮箱不会自动拼接进来。
  // 正文里写出的邮箱会自动变成可点击链接。不需要写 HTML。
  about: `
I am currently a Undergraduate Student · Researcher in School of Artificial Intelligence at Jilin University.

Currently,my research interests focus on self-evolving agent,recursive self-improvement, and skills

I am always glad to exchange ideas about research and potential collaboration. Contact me at zhaoxvliu@gmail.com.
`,
  // ==================== About Me 编辑区结束 ====================

  researchInterests: ["LLM-based Agent", "Self-evolving Agent", "Recursive Self-Improvement"],

  // 新闻只在主页展示，不会加入 CV。没有新闻时填写 []。
  news: [
    { date: "2026-08", text: "Our survey on graph engineering is now available online." },
    { date: "2026-05", text: "We are awarded Finalist at MCM/ICM." },
  ],

  // 论文顺序和作者顺序均按下面填写的顺序展示，不会自动调整。
  publications: [
    {
      title: "Graph Engineering in the Era of LLM Agents: From Individual Intelligence to System Intelligence",
      // 按论文实际顺序填写全部作者，人数不限；name 与论文署名完全一致。
      // 本人加 me: true；超过 6 人时主页和 CV 默认精简，可展开全部；复制引用保留完整名单。
      authors: [
        { name: "Yuyuan Feng" },
        { name: "Zhishang Xiang" },
        { name: "Chaobin Yang" },
        { name: "Qichao Ma" },
        { name: "Zerui Chen" },
        { name: "Yujing Zhang" },
        { name: "Ke Huang" },
        { name: "Chuanjie Wu" },
        { name: "Zhaoxu Liu", me: true },
        { name: "Yili Wang" },
        { name: "Xin He" },
        { name: "Jiapu Wang" },
        { name: "Zijin Hong" },
        { name: "Hao Chen" },
        { name: "Yuanchen Bei" },
        { name: "Kun Wang" },
        { name: "Shengyuan Chen" },
        { name: "Ningyu Zhang" },
        { name: "Enyan Dai" },
        { name: "Linhao Luo" },
        { name: "Qingyi Pan" },
        { name: "Qi Wang" },
        { name: "Wenqi Fan" },
        { name: "Guangjing Wang" },
        { name: "Na Zou" },
        { name: "Yangqiu Song" },
        { name: "Xin Wang" },
        { name: "Zechao Li" },
        { name: "Xia Hu" },
        { name: "Qing Li" },
        { name: "Xiao Huang" },
        { name: "Zhihong Zhang" },
        { name: "Jinsong Su" },
        { name: "Qinggang Zhang" },
        { name: "Yi Chang" },
      ],
      year: "2026",
      venue: "arXiv:2608.21156",
      image: "", // 可选：assets/paper-figure.png
      paperUrl: "https://arxiv.org/abs/2608.21156",
      projectUrl: "https://github.com/DEEP-JLU/Awesome-Graph-Engineering",
    },
  ],

  // 教育经历同步到主页和 CV。请按最近的经历在前排序。
  education: [
    {
      period: "2024 — 2028(expected)",
      title: "B.Eng, Artificial Intelligence",
      organization: "Jilin University",
      logo: "assets/jilin-university.gif", // 可选：校徽图片路径；留空则不显示校徽。
      location: "Changchun,China",
    },
  ],

  // CV 中的科研经历；showOnHomepage 改 true 也会出现在主页经历区。
  // 没有科研经历请填写 []，整个标题也会隐藏。
  researchExperience: [
    {
      period: "2026 — Present",
      title: "Research Assistant",
      organization: "DEEP Lab,Jilin University",
      location: "Changchun,China",
      showOnHomepage: true,
      details: ["Advisor: Prof. [Qinggang Zhang](https://qing145.github.io/)"],
    },
  ],

  // 以下仅用于 CV；没有内容时填写 []，不必为了填满页面编造经历。
  skills: [
    { label: "Programming", items: ["Python", "[other languages]"] },
    { label: "Research", items: ["PyTorch", "LaTeX", "Git", "[other tools]"] },
  ],
  awards: ["2026 · Finalist, MCM/ICM"], // 例如 ["2026 · 奖项名称 · 颁发机构"]
};
