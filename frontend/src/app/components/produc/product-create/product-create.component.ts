import { ProductModel } from './../../../models/product.models';
import { ProductService } from './../../../services/product.service';
import { ShowMessageService } from './../../../services/show-message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public form: FormGroup;
  public product: ProductModel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly showMessageService: ShowMessageService,
    private readonly productService: ProductService,
    private dialog: MatDialog,
  ) {
    this.product = {
      name: '',
      price: null,
      description: '',
      discount: null,
      discountPrice: null
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.product.name],
      description: [this.product.description, [Validators.required, Validators.maxLength(500)]],
      price: [this.product.price, Validators.minLength(0)],
      discount: [this.product.discount, [Validators.min(0), Validators.max(100)]],
      discountPrice: { value: this.product.discountPrice, disabled: true }
    });
  }

  public salvar(): void {
    if (this.form.value.discount === 100)
      this.openModalDiscountValidation();
    else
      this.salvarDados();
  }

  public cancel(): void {
    this.router.navigate(['/products']);
  }

  public calculateDiscountPrice() {
    if (this.form.value.price > 0 && this.form.value.discount > 0) {
      const valorDesconto = (this.form.value.discount / 100) * (this.form.value.price);
      this.product.discountPrice = this.form.value.price - valorDesconto;
    }
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

    this.productService.create(this.product).subscribe(() => {
      this.showMessageService.showMessage('Producto criado');
      this.router.navigate(['/products']);
    });
  }

}
