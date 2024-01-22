export const DISCOUNTS = {
    DISCOUNT_TABLE_HEADERS: [
      {
        header: 'Code',
        name: 'code'
      },
      {
        header: 'Description',
        name: 'description'
      },
      {
        header: 'Value',
        name: 'value'
      },
      {
        header: 'Quantity discounts',
        name: 'count'
      },
      {
        header: 'Used Discounts',
        name: 'usedDiscounts'
      },
      {
        header: 'Expiration date',
        name: 'expirationDate'
      },
      {
        header: 'Status',
        name: 'status'
      },
    ],
    SORTING: [
        { sort: 'expirationDate', asc: true, name: 'Date' },
        { sort: 'count', asc: false, name: 'Quantity asc' },
        { sort: 'count', asc: true, name: 'Quantity desc' },
      ]
  };
  