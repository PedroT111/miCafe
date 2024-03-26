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

export const mobileNavigation = [
  {
    name: 'Home',
    href: PAGES.INDEX,
    icon: 'bi bi-house-fill'
  },
  {
    name: 'Tienda',
    href: PAGES.TIENDA,
    icon: 'bi bi-cup-hot'
  },
  {
    name: 'Mi Perfil',
    href: PAGES.PROFILE,
    icon: 'bi bi-person-fill'
  }
];

export const profileNavigation = [
  {
    name: 'Información de mi Cuenta',
    href: PAGES.PROFILE,
    icon: 'bi bi-person-circle'
  },
  {
    name: 'Historial Pedidos',
    href: PAGES.HISTORIAL,
    icon: 'bi bi-calendar3'
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



export const ADMIN_NAVIGATION = {
  REPORT_NAVS: [
    {
      name: 'Sale Reports',
      href: PAGES.ADMIN_SALES_REPORTS,
      icon: 'bi bi-graph-up'
    },
    {
      name: 'Customer Reports',
      href: PAGES.ADMIN_CUSTOMER_REPORTS,
      icon: 'bi bi-people-fill'
    },
    {
      name: 'Employee Reports',
      href: PAGES.ADMIN_EMPLOYEE_REPORTS,
      icon: 'bi bi-person-badge-fill'
    }
  ],
  PRODUCT_NAVS: [
    {
      name: 'Products',
      href: PAGES.ADMIN_PRODUCTS,
      icon: 'bi bi-cup-hot-fill'
    },
    {
      name: 'Category Products',
      href: '/admin/categories',
      icon: 'bi bi-grid-1x2-fill'
    },
    {
      name: 'Combos',
      href: '/admin/combos',
      icon: 'bi bi-collection-fill'
    },
  ],
  MAIN_NAVS: [
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: 'bi bi-clipboard-check-fill'
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: 'bi bi-person-check-fill'
    },
    {
      name: 'Employees',
      href: '/admin/employees',
      icon: 'bi bi-file-earmark-person-fill'
    },
    {
      name: 'Offers',
      href: '/admin/offers',
      icon: 'bi bi-megaphone-fill'
    },
    {
      name: 'Discounts',
      href: '/admin/discounts',
      icon: 'bi bi-tag-fill'
    }
  ]
};
