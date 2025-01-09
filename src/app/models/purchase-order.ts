export class PurchaseOrder {
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  city!: string;
  address!: string;
  courier!: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.city = '';
    this.address = '';
    this.courier = '';
  }
}
