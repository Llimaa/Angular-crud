import { Component, Inject } from '@angular/core';
import { ProductModel } from 'src/app/models/product.models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
  ) { }
}
