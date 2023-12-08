export interface ReviewRequest {
    id?: number;
    productBrand: string;
    productCoolingCapacity: string | null;
    productType: string | null;
    productTech: string | null;
    productVoltage: number;
    productPurchaseDate: string;
    productDesiredPrice: number;
    productAditionalInfo: string | null;
    customerName: string;
    customerSurname: string;
    customerAddress: string;
    customerPhone: string;
    requestDate?: string;
}