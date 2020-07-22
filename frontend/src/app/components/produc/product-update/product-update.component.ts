import { ModalDialogComponent } from './../modal-dialog/modal-dialog.component';
import { ShowMessageService } from './../../../services/show-message.service';
import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  public product: any;
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly showMessageService: ShowMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getById(id).subscribe(res => {
      this.product = res;
      this.form = this.formBuilder.group({
        id: [this.product.id],
        name: [this.product.name],
        description: [this.product.description, [Validators.required, Validators.maxLength(500)]],
        price: [this.product.price, Validators.minLength(0)],
        discount: [this.product.discount, [Validators.min(0), Validators.max(100)]],
        discountPrice: { value: this.product.discountPrice, disabled: true }
      });
      this.calculateDiscountPrice();
    });
  }


  public updateProduct(): void {
    if (this.form.value.discount === 100)
      this.openModalDiscountValidation();
    else
      this.salvarDados();
  }

  public cancel(): void {
    this.router.navigate(['/products'])
  }

  public calculateDiscountPrice() {
    if (this.form.value.discount === 100) {
      this.product.discountPrice = 0;
    } else
      this.product.discountPrice = this.form.value.price - this.form.value.discount;
  }

  private openModalDiscountValidation(): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '306px',
      height: '156px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.salvarDados();
    });
  }

  private salvarDados() {
    this.product.name = this.form.value.name;
    this.product.description = this.form.value.description;
    this.product.discount = this.form.value.discount;
    this.product.price = this.form.value.price;

    this.productService.update(this.product).subscribe(() => {
      this.showMessageService.showMessage('Produto atualializado com sucesso');
      this.router.navigate(['/products']);
    });
  }
}
