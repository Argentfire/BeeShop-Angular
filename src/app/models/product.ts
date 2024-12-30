export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  amountLeft: number;
  weight: number;
  type: number;
  typeText!: string;
  thumbnail: string;
  constructor(id?: string, name?: string, description?: string, price?: number, amountLeft?: number, weight?: number, type?: number, thumbnail?: string) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.price = price || 0;
    this.amountLeft = amountLeft || 0;
    this.weight = weight || 0;
    this.type = type ?? -1;
    this.thumbnail = thumbnail || '';

    this.setTypeText();
  }

  setTypeText() {
    switch (this.type) {
      case ProductType.Honey:
        this.typeText = 'Пчелен Мед';
        break;
      case ProductType.Polen:
        this.typeText = 'Пчелен Прашец';
        break;
      case ProductType.Propolis:
        this.typeText = 'Прополис';
        break;
      case ProductType.RoyalJelly:
        this.typeText = 'Пчелно Млечице';
        break;
      default:
        this.typeText = '';
        break;
    }
  }
}

export enum ProductType {
  Honey = 0,
  Polen = 1,
  Propolis = 2,
  RoyalJelly = 3
}
