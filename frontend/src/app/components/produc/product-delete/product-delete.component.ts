import { ProductService } from './../../../services/product.service';
import { ProductModel } from 'src/app/models/product.models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ShowMessageService } from 'src/app/services/show-message.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
    private readonly productService: ProductService,
    private readonly showMessageService: ShowMessageService
  ) { }

  public cancel(): void {
    this.dialogRef.close();
  }

  public delete(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.showMessageService.showMessage('produto removido com sucesso');
      this.dialogRef.close(this.product);

    }, (() => {
      console.log('erro ao remover produto!');
    }));
  }
}