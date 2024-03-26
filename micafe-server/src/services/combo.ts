import { type ICombo, Combo } from '../models/comboModel';

export const create = async (data: ICombo): Promise<ICombo> => {
  return await Combo.create(data);
};

export const getOneByName = async (name: string): Promise<ICombo | null> => {
  return await Combo.findOne({ name });
};

export const getById = async (id: string): Promise<ICombo | null> => {
  return await Combo.findById(id);
};

export const getAll = async (): Promise<ICombo[]> => {
  return await Combo.find({ isDeleted: false }).populate('products.product');
};

export const update = async (
  id: string,
  comboData: ICombo
): Promise<ICombo | null> => {
  const combo = await Combo.findById(id);
  if (combo !== null) {
    combo.name = comboData.name;
    combo.description = comboData.description;
    combo.price = comboData.price;
    combo.products = comboData.products;
    combo.urlImage = comboData.urlImage;
    combo.points = comboData.points;
    combo.isActive = comboData.isActive;
    console.log(comboData, 'comboData');
    await combo.save();
  }

  return combo;
};

export const deleteOne = async (id: string): Promise<ICombo | null> => {
  return await Combo.findByIdAndUpdate(
    id,
    {
      isDeleted: true
    },
    { new: true }
  );
};
