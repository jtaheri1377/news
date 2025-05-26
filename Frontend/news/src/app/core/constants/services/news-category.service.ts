import { Injectable } from '@angular/core';
import { NewsCategories, NewsCategory } from '../news-categories';

export interface CategoryResult {

  id: number;
  name: string;
  slug: string;
  path: string;
  breadcrumb: { id: number; name: string; slug: string }[];
}

@Injectable({ providedIn: 'root' })
export class NewsCategoryService {
  constructor() {}

  private search(
    value: string | number,
    categories: Record<string, NewsCategory>,
    path: string[] = [],
    breadcrumb: { id: number; name: string; slug: string }[] = []
  ): CategoryResult | null {
    for (const [key, cat] of Object.entries(categories)) {
      const nextPath = [...path, cat.slug];
      const nextBreadcrumb = [...breadcrumb, { id: cat.id, name: cat.name, slug: cat.slug }];

      if (cat.id === value || cat.slug === value || key === value) {
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          path: nextPath.join('/'),
          breadcrumb: nextBreadcrumb
        };
      }

      if (cat.children) {
        const result = this.search(value, cat.children, nextPath, nextBreadcrumb);
        if (result) return result;
      }
    }
    return null;
  }

  findCategoryByValue(value: string | number) {
    const result = this.search(value, NewsCategories);
    return result ? { id: result.id, name: result.name, slug: result.slug } : null;
  }


  getCategoryByPath(path: string) {
    const parts = path.split('/');
    let current: Record<string, NewsCategory> = NewsCategories;
    let last: NewsCategory | undefined;

    for (const slug of parts) {
      last = Object.values(current).find(c => c.slug === slug);
      if (!last) return null;
      current = last.children || {};
    }

    return last ? { id: last.id, name: last.name, slug: last.slug } : null;
  }

  getBreadcrumb(path: string) {
    const parts = path.split('/');
    let current: Record<string, NewsCategory> = NewsCategories;
    const breadcrumb: { id: number; name: string; slug: string }[] = [];

    for (const slug of parts) {
      const found = Object.values(current).find(c => c.slug === slug);
      if (!found) break;
      breadcrumb.push({ id: found.id, name: found.name, slug: found.slug });
      current = found.children || {};
    }

    return breadcrumb;
  }

  findPathByValue(value: string | number) {

    const result = this.search(value, NewsCategories);
    return result ? { path: result.path, breadcrumb: result.breadcrumb } : null;
  }


  findCategoryKeyPathByValue(value: string | number): { key: string; keyPath: string[] } | null {
    const findKeyPath = (
      value: string | number,
      categories: Record<string, NewsCategory>,
      path: string[] = []
    ): { key: string; keyPath: string[] } | null => {
      for (const [key, cat] of Object.entries(categories)) {
        const currentPath = [...path, key];

        if (cat.id === value || cat.slug === value || key === value) {
          return { key, keyPath: currentPath };
        }

        if (cat.children) {
          const result = findKeyPath(value, cat.children, currentPath);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    return findKeyPath(value, NewsCategories);
  }

}
