// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HINASAKI',
  tagline: '',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hinasaki.net',
  baseUrl: '/',

  organizationName: 'mabetto',
  projectName: 'HINASAKI-DOCS',

  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(d){var config={kitId:'kyg8krc',scriptTimeout:3000,async:true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);`,
    },
  ],

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'ko'],
    localeConfigs: {
      ja: { label: '日本語' },
      en: { label: 'English' },
      ko: { label: '한국어' },
    },
  },

  // 新しいアバターを追加する場合:
  // 1. docs/<avatar-id>/ フォルダを作成してページを追加
  // 2. plugins に @docusaurus/plugin-content-docs のインスタンスを追加
  //    { id: '<avatar-id>', path: 'docs/<avatar-id>', routeBasePath: '<avatar-id>', sidebarPath: './sidebars-<avatar-id>.js' }
  // 3. navbar.items に { type: 'docSidebar', sidebarId: '...', docsPluginId: '<avatar-id>', label: 'アバター名' } を追加

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-2M7447XFM5',
          anonymizeIP: true,
        },
        docs: {
          path: 'docs/3plus1',
          routeBasePath: '3plus1',
          sidebarPath: './sidebars.js',
        },
        blog: {
          path: 'changelog',
          routeBasePath: 'changelog',
          blogTitle: '更新履歴',
          blogDescription: 'HINASAKIアバターの更新履歴',
          blogSidebarTitle: '更新履歴',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: 'all',
            title: 'HINASAKI 更新履歴',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'HINASAKI',
          src: 'img/hinasaki_logo_yoko.svg',
          srcDark: 'img/hinasaki_logo_yoko_white.svg',
          className: 'navbar-logo',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'threePlusOneSidebar',
            docsPluginId: 'default',
            position: 'left',
            label: '３＋１（さん↑ぷらす→うの↑）',
            className: 'navbar-3plus1',
          },
          {
            to: '/changelog',
            label: '更新履歴',
            position: 'left',
            className: 'navbar-changelog',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} HINASAKI. All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
