export const DISCOUNTS = {
    DISCOUNT_TABLE_HEADERS: [
      {
        header: 'Código',
        name: 'code'
      },
      {
        header: 'Descripcion',
        name: 'description'
      },
      {
        header: 'Valor',
        name: 'value'
      },
      {
        header: 'Cantidad de Descuentos',
        name: 'count'
      },
      {
        header: 'Descuentos Usados',
        name: 'usedDiscounts'
      },
      {
        header: 'Fecha de expiración',
        name: 'expirationDate'
      },
      {
        header: 'Estado',
        name: 'status'
      },
    ],
    SORTING: [
        { sort: 'expirationDate', asc: true, name: 'Fecha' },
        { sort: 'count', asc: false, name: 'Cantidad asc' },
        { sort: 'count', asc: true, name: 'Cantidad desc' },
      ]
  };
  