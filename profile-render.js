// Page layouts share one source of truth: profile.js. No HTML is accepted in data.
(() => {
  const p = window.ACADEMIC_PROFILE;
  const error = document.querySelector("[data-load-error]");
  if (!p || typeof p.name !== "string") {
    if (error) error.hidden = false;
    return;
  }
  const list = (value) => Array.isArray(value) ? value : [];
  const join = (values, separator = " · ") => values.filter(Boolean).join(separator);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  const set = (selector, nodes) => document.querySelector(selector)?.replaceChildren(...nodes);
  const safeURL = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value, document.baseURI);
      // Also permit relative assets in a locally opened file:// preview.
      if (["https:", "http:", "mailto:"].includes(url.protocol) ||
          (url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(value))) return value;
    } catch { /* An invalid URL is treated as an unfilled field. */ }
    return "";
  };
  const link = (label, url) => {
    const node = el("a", label);
    node.href = safeURL(url) || "#";
    if (node.getAttribute("href") === "#") node.dataset.placeholderLink = "";
    return node;
  };
  const research = list(p.researchInterests);
  const papers = list(p.publications);
  const education = list(p.education);
  const experience = list(p.researchExperience);
  const social = [
    ["email", "Email", p.email ? "mailto:" + p.email : ""],
    ["scholar", "Google Scholar", p.links?.scholar],
    ["github", "GitHub", p.links?.github],
    ["orcid", "ORCID", p.links?.orcid],
    ["linkedin", "LinkedIn", p.links?.linkedin],
    ["x", "X", p.links?.x],
  ];
  function authors(paper) {
    const fragment = document.createDocumentFragment();
    list(paper.authors).forEach((author, index) => {
      if (index) fragment.append(", ");
      fragment.append(el(author.me ? "strong" : "span", author.name));
    });
    return fragment;
  }
  const venue = (paper) => join([paper.venue, paper.year, paper.status], ", ");
  const citation = (paper) => join([
    list(paper.authors).map((a) => a.name).join(", "),
    paper.title,
    venue(paper),
  ], ". ") + ".";
  function paperLinks(paper, copyButton = false) {
    const container = el("div", null, "publication-links");
    [["Paper", paper.paperUrl], ["Project", paper.projectUrl]].forEach(([label, url]) => {
      if (safeURL(url) || p.templatePreview) container.append(link(label + " ↗", url));
    });
    if (copyButton) {
      const button = el("button", "Copy citation", "text-button");
      button.type = "button";
      button.dataset.citation = citation(paper);
      container.append(button);
    }
    return container;
  }
  function hideSection(selector, empty) {
    const section = document.querySelector(selector)?.closest("section");
    if (!section) return;
    section.hidden = empty;
    if (section.id) document.querySelectorAll('.site-nav a[href="#' + section.id + '"]')
      .forEach((anchor) => { anchor.hidden = empty; });
  }

  document.title = p.name + (document.querySelector("[data-cv]") ? " · CV" : " · Academic Homepage");
  document.querySelector('meta[name="description"]')?.setAttribute("content",
    join([p.name, p.role, p.institution, research.join(", ")]) + (p.templatePreview ? " — Template preview." : ""));
  document.querySelectorAll("[data-profile]").forEach((node) => {
    node.textContent = p[node.dataset.profile] || "";
  });
  document.querySelectorAll(".preview-note").forEach((node) => { node.hidden = !p.templatePreview; });
  document.querySelectorAll("[data-social]").forEach((node) => {
    const key = node.dataset.social;
    const url = key === "cv" ? "cv.html" : social.find((entry) => entry[0] === key)?.[2];
    node.href = safeURL(url) || "#";
    node.hidden = !safeURL(url) && !p.templatePreview;
    if (!safeURL(url)) node.dataset.placeholderLink = "";
  });
  const portrait = document.querySelector(".portrait-placeholder");
  if (portrait && safeURL(p.photo)) {
    const img = el("img");
    img.src = safeURL(p.photo);
    img.alt = "Portrait of " + p.name;
    portrait.classList.add("has-photo");
    portrait.removeAttribute("role");
    portrait.removeAttribute("aria-label");
    portrait.replaceChildren(img);
  }
  const lead = el("p", "I am currently a " + p.role + (p.department ? " in " + p.department : "") + (p.institution ? " at " + p.institution : "") + ".", "lead");
  const aboutCopy = el("div");
  const interests = research.length ? "My research interests include " + research.join(", ") + "." : "";
  if (interests || p.about?.focus) aboutCopy.append(el("p", join([interests, p.about?.focus], " ")));
  if (p.about?.background) aboutCopy.append(el("p", p.about.background));
  if (p.email) {
    const contactLine = el("p", "I am always glad to exchange ideas about research and potential collaboration. Contact me at ", "about-contact");
    const emailLink = link(p.email, "mailto:" + p.email);
    contactLine.append(emailLink, ".");
    aboutCopy.append(contactLine);
  }
  set("[data-about]", [lead, aboutCopy]);
  set("[data-research]", research.map((item) => el("li", item)));
  hideSection("[data-research]", !research.length);
  set("[data-news]", list(p.news).map((item) => {
    const row = el("li");
    const date = el("time", item.date);
    if (/^\d{4}-\d{2}$/.test(item.date)) {
      const value = new Date(item.date + "-01T12:00:00Z");
      if (!Number.isNaN(value.getTime())) {
        date.dateTime = item.date;
        date.textContent = value.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
      }
    }
    row.append(date, el("p", item.text));
    return row;
  }));
  hideSection("[data-news]", !list(p.news).length);
  set("[data-publications]", papers.map((paper) => {
    const card = el("article", null, "publication-card");
    const figure = el("div", null, "publication-visual");
    if (safeURL(paper.image)) {
      const img = el("img");
      img.src = safeURL(paper.image);
      img.alt = "Overview figure: " + paper.title;
      img.loading = "lazy";
      figure.append(img);
    } else {
      figure.append(el("span", paper.type, "visual-label"),
        el("div", null, "visual-orbit orbit-one"), el("div", null, "visual-orbit orbit-two"),
        el("div", "↗", "visual-core"), el("span", "Publication", "visual-caption"));
    }
    const copy = el("div", null, "publication-copy");
    const meta = el("div", null, "publication-meta");
    [paper.type, paper.year].filter(Boolean).forEach((value) => meta.append(el("span", value)));
    const authorLine = el("p", null, "authors");
    authorLine.append(authors(paper));
    copy.append(meta, el("h3", paper.title), authorLine, el("p", venue(paper), "venue"));
    if (paper.summary) copy.append(el("p", paper.summary, "publication-summary"));
    copy.append(paperLinks(paper, true));
    card.append(figure, copy);
    return card;
  }));
  hideSection("[data-publications]", !papers.length);
  const publicationHeading = document.querySelector("#publications h2");
  if (publicationHeading) publicationHeading.textContent = papers.length === 1 ? "Publication" : "Publications";
  const timeline = [...education, ...experience.filter((item) => item.showOnHomepage)];
  set("[data-experience]", timeline.map((item) => {
    const row = el("article", null, "timeline-item");
    const copy = el("div");
    copy.append(el("h3", item.title), el("p", join([item.organization, item.location]), "timeline-org"));
    list(item.details).forEach((detail) => copy.append(el("p", detail)));
    row.append(el("div", item.period, "timeline-date"), copy);
    return row;
  }));
  hideSection("[data-experience]", !timeline.length);
  const cv = document.querySelector("[data-cv]");
  if (cv) {
    const contents = [];
    if (p.templatePreview) contents.push(el("p", "Template preview · Personal details and entries below are placeholders.", "preview-note"));
    contents.push(el("p", "Curriculum vitae", "eyebrow"), el("h1", p.name),
      el("p", join([p.role, p.department, p.institution])));
    const contacts = el("p", null, "cv-contacts");
    if (p.location) contacts.append(el("span", p.location));
    social.forEach(([key, label, url]) => {
      if (safeURL(url)) contacts.append(link(key === "email" ? p.email : label, url));
    });
    contents.push(contacts);
    function section(title, nodes) {
      if (!nodes.length) return;
      const block = el("section", null, "cv-section");
      block.append(el("h2", title), ...nodes);
      contents.push(block);
    }
    function cvExperience(item) {
      const entry = el("div", null, "cv-entry");
      const heading = el("p");
      heading.append(el("strong", item.organization),
        " — " + join([item.title, item.location]) + (item.period ? " (" + item.period + ")" : ""));
      entry.append(heading);
      if (list(item.details).length) {
        const bullets = el("ul");
        list(item.details).forEach((detail) => bullets.append(el("li", detail)));
        entry.append(bullets);
      }
      return entry;
    }
    section("Research interests", research.length ? [el("p", research.join(", "))] : []);
    section("Education", education.map(cvExperience));
    section(papers.length === 1 ? "Publication" : "Publications", papers.map((paper) => {
      const entry = el("div", null, "cv-entry");
      const line = el("p");
      line.append(authors(paper), ". “" + paper.title + ".” " + venue(paper) + ".");
      entry.append(line, paperLinks(paper));
      return entry;
    }));
    section("Research experience", experience.map(cvExperience));
    section("Skills", list(p.skills).map((skill) => {
      const line = el("p");
      line.append(el("strong", skill.label + ": "), list(skill.items).join(", "));
      return line;
    }));
    section("Awards & activities", list(p.awards).map((award) => el("p", award)));
    if (p.lastUpdated) contents.push(el("p", "Last updated " + p.lastUpdated, "cv-updated"));
    cv.replaceChildren(...contents);
  }
})();
