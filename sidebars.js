// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  threePlusOneSidebar: [
    {
      type: 'category',
      label: '概要',
      collapsed: false,
      items: [
        'overview/about',
        'overview/contents',
      ],
    },
    {
      type: 'category',
      label: 'はじめる',
      collapsed: false,
      items: [
        'getting-started/import',
        'getting-started/se-install',
      ],
    },
    {
      type: 'category',
      label: '基本操作',
      collapsed: false,
      items: [
        'basics/menu',
        'basics/expressions',
        'basics/gestures',
        'basics/sleep-poses',
      ],
    },
    {
      type: 'category',
      label: '改変ガイド',
      collapsed: false,
      items: [
        'customization/tools',
        'customization/ma-outfit',
        'customization/hair-stencil',
        'customization/color',
        'customization/mochifitter',
        'customization/marshmallow-pb',
      ],
    },
    {
      type: 'category',
      label: '仕様',
      collapsed: true,
      items: [
        'outfit/index',
        'settings/index',
        'se-extension/index',
      ],
    },
    'troubleshooting/index',
  ],
};

export default sidebars;
