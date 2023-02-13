import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Quick Access'
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Users',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List Users',
        url: '/users/list'
      },
    ]
  },
];
