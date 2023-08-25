/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validators } from "@angular/forms"

export const PRODUCT = {
    PRODUCT_TABLE_HEADERS: [
        {
            header: 'Nombre',
            name: 'name'
        },
        {
            header: 'Descripción',
            name: 'description'
        },
        {
            header: 'Precio',
            name: 'price'
        },
        {
            header: 'Imagen',
            name: 'urlImage'
        },
        {
            header: 'En oferta',
            name: 'isOnSale'
        }
    ]
}


export const FORM_FIELD_PRODUCT = [
    {
        label: 'Nombre',
        name:'name',
        type: 'text',
        id: 'txtName',
        validators:[Validators.required],
    },
    {
        label: 'Precio',
        name:'price',
        type: 'number',
        id: 'txtPrice',
        validators:[Validators.required],
    },
    {
        label: 'Descripcion',
        name:'description',
        type: 'text',
        id: 'txtDescription',
        validators:[Validators.required],
    },
    {
        label: 'Categoria',
        name:'category',
        type: 'select',
        id: 'txtCategory',
        validators:[Validators.required],
    },
    {
        label: 'Tiene leche',
        name: 'hasMilk',
        type: 'checkbox',
        id: 'chkHasMilk',
        initialValue: false
    },
]

export const ProductMapping = {
    _id: '_id',
    name: 'name',
    price: 'price',
    description: 'description',
    hasMilk: 'hasMilk',
    urlImage: 'urlImage',
    category: 'category._id',
    isDeleted: 'isDeleted'
  };