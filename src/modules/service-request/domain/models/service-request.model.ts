export interface ServiceRequest {
    id?: number;
    referenceCode?: string;
    serviceType: string;
    requestDate?: string;
    
    customerName: string;
    customerSurname: string;
    customerAddress: string;
    customerPhone: string;

    productBrand: string;
    productType: string;
    productTech: string;
    productVoltage: string;
    productAditionalInfo?: string;
}