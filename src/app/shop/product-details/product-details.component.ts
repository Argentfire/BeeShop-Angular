import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  images!: string[];
  id!: string;
  amountLeft!: number;
  description!: string;
  name!: string;
  price!: number;
  type!: number;
  weight!: number;
  activeImageIndex: number;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private renderer: Renderer2
  ) {
    this.activeImageIndex = 0;
  }

  @ViewChild('myDialog', { static: true })
  dialogElement!: ElementRef<HTMLDialogElement>;
  @ViewChild('activeImage', { static: true })
  activeImage!: ElementRef<HTMLDivElement>;

  openBigImage() {
    // Check if dialogElement is defined before using it
    if (this.dialogElement) {
      const dialog: HTMLDialogElement = this.dialogElement.nativeElement;
      dialog.showModal();
    }
  }

  closeDialog() {
    if (this.dialogElement) {
      const dialog: HTMLDialogElement = this.dialogElement.nativeElement;
      dialog.close();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.name = params['name'];
      this.description = params['description'];
      this.price = params['price'];
      this.amountLeft = params['amountLeft'];
      this.weight = params['weight'];

      this.shopService.getHoneyImages(this.id).subscribe((data) => {
        this.images = data as string[];
        this.setActiveImage();
      });
    });
  }
  clickInModal($event: any) {
    const modalDialogPosition: DOMRect =
      $event.currentTarget.getBoundingClientRect();
    if (!this.checkInsideBounds($event.x, $event.y, modalDialogPosition)) {
      $event.currentTarget.close();
    }
  }

  checkInsideBounds(x: number, y: number, rect: DOMRect): boolean {
    if (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  selectImage(idx: number, event: any) {
    event.stopPropagation();
    this.activeImageIndex = idx;
    this.setActiveImage();
  }

  setActiveImage() {
    const imageElement: HTMLDivElement = this.activeImage.nativeElement;
    if (imageElement) {
      const element = document.getElementById('active-image');
      element
        ? (element.style.backgroundImage = `url(${
            this.images[this.activeImageIndex]
          })`)
        : '';
      // imageElement.style.setProperty('background-image', this.getImageURL());
      debugger;
    }
  }

  getImageURL() {
    return `url(${this.images[this.activeImageIndex]});`;
  }

  getLoadingImg() {
    return 'url(assets/loading.gif)';
  }

  debug() {
    debugger;
    this.shopService
      .test(this.images[this.activeImageIndex])
      .subscribe((data) => {
        debugger;
      });
  }
}
