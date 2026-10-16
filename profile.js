// 唯一的个人资料入口：修改这里，主页与在线 CV 会一起更新。
// About Me：只改下方 about 的两端反引号之间的整段文字，空一行分段。
// 其它字段：只改引号内文字；多条记录用英文逗号分隔。详细说明见 README.md。
// 此文件会公开，请勿填写密码、身份证号、家庭住址等私密信息。
window.ACADEMIC_PROFILE = {
  // 所有占位内容换成真实资料后改为 false，隐藏模板提示。
  templatePreview: true,
  lastUpdated: "Sep 2026",

  name: "ZhaoxuLiu",
  role: "Undergraduate Student · Researcher",
  department: "School of Artificial Intelligence",
  institution: "Jilin University",
  location: "Changchun, China",
  email: "zhaoxvliu@gmail.com",
  photo: "", // 先上传照片，例如 assets/portrait.jpg，再填这个路径。

  // 空字符串表示尚未填写；正式模式下会自动隐藏没有地址的链接。
  links: {
    scholar: "",
    github: "https://github.com/ZhaoxuLiu",
    orcid: "",
    linkedin: "",
    x: "",
  },

  // ==================== About Me 整段编辑区 ====================
  // 在两端反引号之间直接写完整介绍，可以粘贴多行文字，空一行分段。
  // 这块文字完全由你控制；姓名、身份、学校、研究方向、邮箱不会自动拼接进来。
  // 正文里写出的邮箱会自动变成可点击链接。不需要写 HTML。
  about: `
I am currently a Undergraduate Student · Researcher in School of Artificial Intelligence at Jilin University.

My research interests include LLM-based Agent, Self-evolving Agent, Recursive Self-Improvement. Currently,my research interests focus on self-evolving agent,recursive self-improvement, and skills

Before this, I [brief education, laboratory, or project background]. Outside research, I enjoy [one or two genuine interests].

I am always glad to exchange ideas about research and potential collaboration. Contact me at zhaoxvliu@gmail.com.
`,
  // ==================== About Me 编辑区结束 ====================

  researchInterests: ["LLM-based Agent", "Self-evolving Agent", "Recursive Self-Improvement"],

  // 新闻只在主页展示，不会加入 CV。没有新闻时填写 []。
  news: [
    { date: "2026-09", text: "Our survey on [research topic] is now available online." },
    { date: "2026-06", text: "Started working on [current project or research direction]." },
    { date: "2025-09", text: "Joined [laboratory / research group] at [university]." },
  ],

  // 论文顺序和作者顺序均按下面填写的顺序展示，不会自动调整。
  publications: [
    {
      title: "A Formal Title for Your Survey Paper Goes Here",
      // 按论文实际顺序填写全部作者，人数不限；name 与论文署名完全一致。
      // 本人加 me: true；超过 6 人时主页自动精简，可展开全部，CV 和引用保留完整名单。
      authors: [
        { name: "First Author" },
        { name: "Second Author" },
        { name: "Your Name", me: true },
        { name: "Senior Author" },
      ],
      year: "2026",
      venue: "Journal / Conference / arXiv",
      image: "", // 可选：assets/paper-figure.png
      paperUrl: "",
      projectUrl: "",
    },
  ],

  // 教育经历同步到主页和 CV。请按最近的经历在前排序。
  education: [
    {
      period: "2024 — Present",
      title: "Degree Name, Major",
      organization: "University Name",
      location: "City, Country",
      details: ["Advisor: Prof. [Name] · Research group: [Laboratory]"],
    },
    {
      period: "2020 — 2024",
      title: "Previous Degree, Major",
      organization: "University Name",
      location: "City, Country",
      details: ["Selected coursework, thesis, distinction, or research experience."],
    },
  ],

  // CV 中的科研经历；showOnHomepage 改 true 也会出现在主页经历区。
  // 没有科研经历请填写 []，整个标题也会隐藏。
  researchExperience: [
    {
      period: "2025 — Present",
      title: "Research Assistant",
      organization: "Research Group / Laboratory",
      location: "",
      showOnHomepage: false,
      details: [
        "Describe a concrete research task, method, or contribution.",
        "Describe a technical result, dataset, system, or collaboration.",
      ],
    },
  ],

  // 以下仅用于 CV；没有内容时填写 []，不必为了填满页面编造经历。
  skills: [
    { label: "Programming", items: ["Python", "[other languages]"] },
    { label: "Research", items: ["PyTorch", "LaTeX", "Git", "[other tools]"] },
  ],
  awards: [], // 例如 ["2026 · 奖项名称 · 颁发机构"]
};
