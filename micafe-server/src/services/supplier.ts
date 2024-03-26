import { ISupplier, Supplier } from '../models/supplierModel';

export const createSupplier = async (
  supplier: ISupplier
): Promise<ISupplier> => {
  return await Supplier.create(supplier);
};

export const getAllSupplier = async (): Promise<ISupplier[]> => {
  return await Supplier.find({ isDeleted: false });
};

export const getOneSupplier = async (id: string): Promise<ISupplier | null> => {
  return await Supplier.findById(id);
};

export const updateSupplier = async (
  id: string,
  supplierData: ISupplier
): Promise<ISupplier | null> => {
  return await Supplier.findByIdAndUpdate(
    id,
    {
      ...supplierData
    },
    { new: true }
  );
};


export const deleteSupplier = async (
    id: string,
  ): Promise<ISupplier | null> => {
    return await Supplier.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      { new: true }
    );
  }; 