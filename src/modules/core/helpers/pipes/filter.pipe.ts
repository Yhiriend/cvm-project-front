import { Pipe, PipeTransform, inject } from '@angular/core';
import { Airconditioner } from '../../../airconditioner/domain/models/airconditioner.model';
import { DataService } from '../filter-state.service';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  dataService = inject(DataService);
  transform(
    products: Airconditioner[],
    page: number = 0,
    orderby: string = '',
    filterByPrice: string = '',
    filterByUsageTime: string = ''
  ): Airconditioner[] {
    let filteredProducts = products.slice();

    // Filtrar por precio
    if (filterByPrice !== '') {
      filteredProducts = this.filterByPrice(filteredProducts, filterByPrice);
    }

    // Filtrar por tiempo de uso
    if (filterByUsageTime !== '') {
      filteredProducts = this.filterByUsageTime(
        filteredProducts,
        filterByUsageTime
      );
    }

    // Ordenar según orderby
    if (orderby === '1') {
      filteredProducts.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (orderby === '2') {
      filteredProducts.sort(
        (productA, productB) => productB.price - productA.price
      );
    }

    this.dataService.sendProductFiltered(filteredProducts.length);
    // Devolver la página específica
    return filteredProducts.slice(page, page + 20);
  }

  private filterByPrice(
    products: Airconditioner[],
    filterByPrice: string
  ): Airconditioner[] {
    switch (filterByPrice) {
      case '0':
        return products.filter((product) => product.price < 800000);
      case '1':
        return products.filter(
          (product) => product.price >= 800000 && product.price < 1000000
        );
      case '2':
        return products.filter(
          (product) => product.price >= 1000000 && product.price < 1500000
        );
      case '3':
        return products.filter(
          (product) => product.price >= 1500000 && product.price < 2000000
        );
      case '4':
        return products.filter((product) => product.price >= 2000000);
      default:
        return products;
    }
  }

  private filterByUsageTime(
    products: Airconditioner[],
    filterByUsageTime: string
  ): Airconditioner[] {
    const currentDate = new Date();

    switch (filterByUsageTime) {
      case '0':
        return products.filter((product) => product.state === 5);
      case '1':
        return products.filter((product) => {
          const registerDate = new Date(product.registerDate);
          const timeDifference =
            currentDate.getFullYear() - registerDate.getFullYear();
          return timeDifference < 1;
        });
      case '2':
        return products.filter((product) => {
          const registerDate = new Date(product.registerDate);
          const timeDifference =
            currentDate.getFullYear() - registerDate.getFullYear();
          return timeDifference >= 1 && timeDifference < 2;
        });
      case '3':
        return products.filter((product) => {
          const registerDate = new Date(product.registerDate);
          const timeDifference =
            currentDate.getFullYear() - registerDate.getFullYear();
          return timeDifference >= 2 && timeDifference < 3;
        });
      case '4':
        return products.filter((product) => {
          const registerDate = new Date(product.registerDate);
          const timeDifference =
            currentDate.getFullYear() - registerDate.getFullYear();
          return timeDifference >= 3;
        });
      default:
        return products;
    }
  }
}
