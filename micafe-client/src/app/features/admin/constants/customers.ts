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
  ]
};
