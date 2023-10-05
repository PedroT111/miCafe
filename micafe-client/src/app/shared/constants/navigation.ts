import { PAGES } from './index';
export const navigationNavbar = [
  {
    name: 'Home',
    href: PAGES.INDEX,
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Tienda',
    href: PAGES.TIENDA,
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Nosotros',
    href: PAGES.US,
    icon: 'bi bi-house-fill'
  }
];

export const loggedNavigationNavbar = [
  {
    name: 'Mi Perfil',
    href: PAGES.PROFILE
  },
  {
    name: 'Historial Pedidos',
    href: PAGES.HISTORIAL
  }
];

export const adminNavigationNavbar = [
  {
    name: 'Dashboard',
    href: PAGES.ADMIN_DASHBOARD,
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Products',
    href: PAGES.ADMIN_PRODUCTS,
    icon: 'bi bi-cup-hot-fill'
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Combos',
    href: '/admin/combos',
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Offers',
    href: '/admin/offers',
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Discounts',
    href: '/admin/discounts',
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Reports',
    href: PAGES.ADMIN_REPORTS,
    icon: 'bi bi-bar-chart-fill'
  },
]