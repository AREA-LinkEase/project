const navigation = () => {
  return [
    {
      title: 'Home',
      icon: 'tabler:smart-home',
      path: '/'
    },
    {
      sectionTitle: 'Application'
    },
    {
      title: 'Workspaces',
      icon: 'tabler:command',
      path: '/workspaces'
    },
    {
      title: 'Services',
      icon: 'tabler:link',
      path: '/services'
    },
    {
      sectionTitle: 'Community'
    },
    {
      title: 'Workspaces',
      icon: 'tabler:command',
      path: '/community/workspaces'
    },
    {
      title: 'Automates',
      icon: 'tabler:toggle-left',
      path: '/community/automates'
    },
    {
      title: 'Services',
      icon: 'tabler:link',
      path: '/community/services'
    },
    {
      sectionTitle: 'Help & Documentation'
    },
    {
      title: 'FAQ',
      icon: 'tabler:zoom-question',
      path: '/faq'
    },
    {
      title: 'Chat AI',
      badgeContent: 'beta',
      badgeColor: 'error',
      icon: 'tabler:comet',
      path: '/chatai'
    },
    {
      title: 'Documentation',
      icon: 'tabler:file-search',
      path: 'https://docs.google.com/document/d/1JHtuHZJVM6iDgHY4FmnXTlxGSnB4Cz2fqoqrZPvAGrU/edit?usp=sharing'
    }
  ]
}

export default navigation
