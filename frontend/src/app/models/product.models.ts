export interface ProductModel {
    id?: string;
    name: string;
    price: number;
    description: string;
    discount: number;
    discountPrice: number;
    fullDescription?: string;
}