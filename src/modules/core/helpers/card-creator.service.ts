import { Injectable, Renderer2, inject } from '@angular/core';
import { Airconditioner } from '../../airconditioner/domain/models/airconditioner.model';
import { DialogService } from '../../../shared/components/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CardCreatorService {
  dialog = inject(DialogService);

  capitalizeLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  getImage(image: string): string {
    return `../../../assets/images/pics/${image}`;
  }

  addProducts(
    products: any[],
    container: any,
    renderer: Renderer2,
    filterFunction?: (product: any) => boolean
  ) {
    container.innerHTML = '';

    let fullProducts = products;
    if (filterFunction) {
      fullProducts = products.filter(filterFunction);
    }

    fullProducts.forEach((product) => {
      const card = renderer.createElement('div');
      renderer.addClass(card, 'product-card');

      const productImageWrapper = renderer.createElement('div');
      renderer.addClass(productImageWrapper, 'product-image-wrapper');

      const productImageContainer = renderer.createElement('div');
      renderer.addClass(productImageContainer, 'product-image-container');

      const productImage = renderer.createElement('img');
      renderer.addClass(productImage, 'product-image');
      renderer.setProperty(
        productImage,
        'src',
        this.getImage(product.image) ?? '../../../assets/images/airproduct.png'
      );

      renderer.appendChild(productImageContainer, productImage);
      renderer.appendChild(productImageWrapper, productImageContainer);
      renderer.appendChild(card, productImageWrapper);

      const hr = renderer.createElement('hr');
      renderer.addClass(hr, 'divider-card');

      renderer.appendChild(card, hr);

      const productTitle = renderer.createElement('h1');
      renderer.addClass(productTitle, 'font-maxwellRegular');
      renderer.setProperty(productTitle, 'id', 'product-title');
      const productTitleText = renderer.createText(
        this.capitalizeLetter(product.brand) +
          ' + ' +
          this.capitalizeLetter(product.tech)
      );
      renderer.appendChild(productTitle, productTitleText);

      renderer.appendChild(card, productTitle);

      const productStateWrapper = renderer.createElement('div');
      renderer.addClass(productStateWrapper, 'product-state-wrapper');
      this.setStars(product.state, productStateWrapper, renderer);

      renderer.appendChild(card, productStateWrapper);

      const productPriceWrapper = renderer.createElement('div');
      renderer.addClass(productPriceWrapper, 'product-price-wrapper');
      const productPriceTextWrapper = renderer.createElement('h1');
      renderer.addClass(productPriceTextWrapper, 'product-price-text');
      const productPriceText = renderer.createText(
        '$' + product.price.toLocaleString()
      );
      renderer.appendChild(productPriceTextWrapper, productPriceText);
      renderer.appendChild(productPriceWrapper, productPriceTextWrapper);

      renderer.appendChild(card, productPriceWrapper);

      renderer.listen(card, 'click', () => {
        this.dialog.openProductDialog(product);
      });

      renderer.appendChild(container, card);
    });
  }

  getState(starsNumber: number): string {
    let state = '';
    switch (starsNumber) {
      case 3:
        state = 'bueno';
        break;
      case 4:
        state = 'excelente';
        break;
      case 5:
        state = 'nuevo';
        break;
    }
    return state;
  }

  setStars(starsNumber: number, container: any, renderer: Renderer2) {
    const starsWrapper = renderer.createElement('div');
    renderer.addClass(starsWrapper, 'stars-wrapper');

    const starsDefault = renderer.createElement('div');
    renderer.addClass(starsDefault, 'icon-wrapper');

    for (let i = 1; i <= 5; i++) {
      const iconStar = renderer.createElement('img');
      renderer.addClass(iconStar, 'icon-star');
      if (i <= starsNumber) {
        renderer.addClass(iconStar, 'true-state');
      }

      renderer.setProperty(
        iconStar,
        'src',
        '../../../assets/images/iconestrella.png'
      );

      renderer.appendChild(starsDefault, iconStar);
    }

    renderer.appendChild(starsWrapper, starsDefault);

    const stateTextWrapper = renderer.createElement('p');
    renderer.addClass(stateTextWrapper, 'font-maxwellRegular');
    renderer.setProperty(stateTextWrapper, 'id', 'state-text-wrapper');
    const stateText = renderer.createText(this.getState(starsNumber));
    renderer.appendChild(stateTextWrapper, stateText);

    renderer.appendChild(starsWrapper, stateTextWrapper);

    renderer.appendChild(container, starsWrapper);
  }

  getYearsAndMonthsPassed(registerDate: string): {
    years: number;
    months: number;
  } {
    const currentDate = new Date();
    const registerDateObj = new Date(registerDate);

    const years = currentDate.getFullYear() - registerDateObj.getFullYear();
    const months = currentDate.getMonth() - registerDateObj.getMonth();

    return { years, months };
  }

  getYearsAndMonthsTransformedIntoText(registerDate: string): string {
    let stringTime = '';
    const { years, months } = this.getYearsAndMonthsPassed(registerDate);
    if (years > 1) {
      stringTime = years + ' años y ';
    } else if (years === 1) {
      stringTime = 'Un año y ';
    }
    if(months>1){
      stringTime += months + ' meses';
    }else if(months===1){
      stringTime += ' un mes'
    }
    return stringTime;
  }
}
