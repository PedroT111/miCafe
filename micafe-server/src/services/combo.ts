import { type ICombo, Combo } from '../models/comboModel';

export const create = async (data: ICombo): Promise<ICombo> => {
  return await Combo.create(data);
};

export const getOneByName = async (name: string): Promise<ICombo | null> => {
  return await Combo.findOne({ name });
};

export const getById = async (id: any): Promise<ICombo | null> => {
  return await Combo.findById(id).populate('products.product');
};

export const getAll = async (): Promise<ICombo[]> => {
  return await Combo.find();
};

export const update = async (
  id: any,
  comboData: ICombo
): Promise<ICombo | null> => {
  return await Combo.findByIdAndUpdate(
    id,
    {
      ...comboData,
      updateAt: new Date()
    },
    { new: true }
  );
};

export const deleteOne = async (id: any): Promise<ICombo | null> => {
  return await Combo.findOneAndDelete(id);
};
