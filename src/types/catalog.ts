export interface ICategory {
  id: number;
  name: string;
  slug: string;
  index: boolean;
  children: ICategory[] | null;
}

export interface ICatalog<T extends ICategory> {
  categories: T[];
}
