import { map, catchError } from 'rxjs/operators';
import { ProductModel } from 'src/app/models/product.models';
import { Api } from './../api/api';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { ShowMessageService } from './show-message.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private resourceUrl: string = `${Api.API_URL}/products`;
    constructor(private http: HttpClient, private readonly showMessageService: ShowMessageService) { }

    public create(product: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(this.resourceUrl, product).pipe(
            map((obj) => obj),
            catchError(error => this.errorHandler(error))
        );
    }



    public getAll(): Observable<Array<ProductModel>> {
        return this.http.get<Array<ProductModel>>(this.resourceUrl).pipe(
            map((obj) => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    public getById(id: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.resourceUrl}/${id}`).pipe(
            map((obj) => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    public update(product: ProductModel): Observable<ProductModel> {
        return this.http.put<ProductModel>(`${this.resourceUrl}/${product.id}`, product).pipe(
            map((obj) => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    public delete(id: string): Observable<ProductModel> {
        return this.http.delete<ProductModel>(`${this.resourceUrl}/${id}`).pipe(
            map((obj) => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    private errorHandler(error: any): Observable<any> {
        this.showMessageService.showMessage('Ocorreu um erro', true);
        return EMPTY;
    }
}