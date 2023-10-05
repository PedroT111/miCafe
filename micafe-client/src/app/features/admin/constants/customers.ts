export const CUSTOMERS = {
  CUSTOMERS_TABLE_HEADERS: [
    {
      header: 'Nombre',
      name: 'name'
    },
    {
      header: 'Apellido',
      name: 'lastName'
    },
    {
      header: 'Email',
      name: 'email'
    },
    {
      header: 'Cantidad Pedidos',
      name: 'orderCount'
    },
    {
      header: 'Fecha de Registro',
      name: 'registrationDate'
    },
    {
      header: 'Última Compra',
      name: 'lastOrderDate'
    },
    {
      header: 'Estado',
      name: 'isValidated'
    }
  ],
  SORTING: [
    { sort: 'name', asc: true, name: 'Apellido asc' },
    { sort: 'name', asc: false, name: 'Apellido desc' },
    { sort: 'orders', asc: true, name: 'Compras asc' },
    { sort: 'orders', asc: false, name: 'Compras desc' }
  ]
};
