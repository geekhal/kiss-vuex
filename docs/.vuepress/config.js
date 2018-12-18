const pkg = require("../../package.json");

module.exports = {
    title: pkg.name,
    description: pkg.description,
    // head: [["link", { rel: "icon", href: "/static/img/uniqy.png" }]],
    base: `/${pkg.name}/`,
    markdown: {
        config: md => {
            md.use(require("markdown-it-emoji"));
        }
    },
    chainWebpack: (config, isServer) => {
        config.resolve.alias.merge({});
    },
    themeConfig: {
        repo: pkg.homepage,
        docsDir: "docs",
        displayAllHeaders: true,
        lastUpdated: "最后更新", // string | boolean
        sidebarDepth: 4,
        sidebar: "auto",
        locales: {
            "/": {
                selectText: "Languages",
                label: "English"
            },
            "/zh/": {
                // 多语言下拉菜单的标题
                selectText: "选择语言",
                // 该语言在下拉菜单中的标签
                label: "简体中文"
            }
        }
    },
    locales: {
        "/": {
            lang: "en-US",
            title: pkg.name,
            description: pkg.description
        },
        "/zh/": {
            lang: "zh-CN",
            title: pkg.name,
            description: pkg.descriptionZh
        }
    }
};
