export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  amountLeft: number;
  weight: number;
  type: number;
  thumbnail: string;
  constructor(id?: string, name?: string, description?: string, price?: number, amountLeft?: number, weight?: number, type?: number, thumbnail?: string) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.price = price || 0;
    this.amountLeft = amountLeft || 0;
    this.weight = weight || 0;
    this.type = type || -1;
    this.thumbnail = thumbnail || '';
  }
}
