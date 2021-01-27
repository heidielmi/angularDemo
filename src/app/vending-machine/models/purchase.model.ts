export interface IPurchase {
    message: string;
    change?: number;
    purchasedQuantity?: number;
    status: purchaseStatus;
}

export enum purchaseStatus {
    success = 0,
    outOfStock = 1,
    insufficientMoney = 2,
}