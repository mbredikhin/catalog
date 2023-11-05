import { ICategory } from '@/types';

export const findCategoryByPath = (path: string[], category: ICategory): ICategory => {
  if (path.length > 0 && category.children !== null) {
    return findCategoryByPath(
      path.slice(1),
      category.children.find(({ slug }) => slug === path[0]) as ICategory,
    );
  }
  return category;
};
