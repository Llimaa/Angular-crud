import { ProductDetailsComponent } from './../product-details/product-details.component';
import { ProductService } from './../../../services/product.service';
import { Component, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/models/product.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})

export class ProductReadComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private products: Array<ProductModel>;
  public displayedColumns = ['description', 'discount', 'discountPrice', 'action'];
  public dataSource = new MatTableDataSource<ProductModel>(this.products);
  constructor(
    private productService: ProductService,
    public dialog: MatDialog

  ) {
    this.getProducts();
  }


  ngAfterViewInit() {
    this.configPaginate();
  }

  private getProducts(): void {
    this.productService.getAll().subscribe(res => {
      res.forEach((product: ProductModel) => {
        product.fullDescription = product.description;
        if (product.description.length >= 140)
          product.description = `${product.description.substr(0, 140)}...`;
      });
      this.dataSource.data = res;
      this.products = res
    });
  }

  public openExcludeModal(product: ProductModel): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      width: '600px',
      height: '150px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      const index = this.dataSource.data.indexOf(result);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.configPaginate();
      }
    });
  }

  public openDetailsModal(product: ProductModel): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '1000px',
      height: '1000',
      data: product
    });
  }

  private configPaginate() {
    this.dataSource = new MatTableDataSource<ProductModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.sort.active;
    this.dataSource.sort = this.sort;
  }
}