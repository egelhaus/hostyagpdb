const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'YAGPDB Hosting Guide',
  tagline: 'Guide is maintened by Community',
  url: 'https://hostyagpdb.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jantsop', // Usually your GitHub org/user name.
  projectName: 'hostyagpdb', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'YAGPDB Hosting Guide',
        logo: {
          alt: 'YAGPDB Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Hosting Guide',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'YAGPDB GitHub',
                href: 'https://github.com/botlabs-gg/yagpdb',
              },
              {
                label: 'Discord (Use #self-hosting-discussion channel)',
                href: 'https://discord.gg/4udtcA5',
              },
            {
              label: 'Docker images',
              href: 'https://hub.docker.com/r/teyker/yagpdb',
            },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} YAGPDB Community. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
