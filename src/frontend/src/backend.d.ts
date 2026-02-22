import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ClearanceItem {
    id: bigint;
    product_category: ProductCategory;
    availability_status: AvailabilityStatus;
    clearance_price: Price;
    discount_percentage: DiscountPercentage;
    product_name: ProductName;
    store_name: StoreName;
    original_price: Price;
    last_update: Timestamp;
    store_location: StoreLocation;
}
export interface StoreLocation {
    zip_code: ZipCode;
    city: City;
    state: State;
    address: Address;
    coordinates: Coordinates;
}
export type Coordinates = [number, number];
export type StoreName = string;
export type City = string;
export type ProductName = string;
export type Price = number;
export type ZipCode = bigint;
export type DiscountPercentage = number;
export type State = string;
export type ProductCategory = string;
export type Address = string;
export enum AvailabilityStatus {
    limited_quantity = "limited_quantity",
    available = "available",
    out_of_stock = "out_of_stock"
}
export interface backendInterface {
    addClearanceItem(storeName: StoreName, productName: ProductName, originalPrice: Price, clearancePrice: Price, discountPercentage: DiscountPercentage, productCategory: ProductCategory, address: Address, city: City, state: State, zipCode: ZipCode, coordinates: Coordinates, availabilityStatus: AvailabilityStatus): Promise<bigint>;
    deleteClearanceItem(id: bigint): Promise<void>;
    getClearanceItem(id: bigint): Promise<ClearanceItem>;
    getClearanceItemsByLocation(city: City, state: State): Promise<Array<ClearanceItem>>;
    getClearanceItemsByPriceRange(minPrice: Price, maxPrice: Price): Promise<Array<ClearanceItem>>;
    getClearanceItemsByStore(storeName: StoreName): Promise<Array<ClearanceItem>>;
    updateClearanceItem(id: bigint, storeName: StoreName, productName: ProductName, originalPrice: Price, clearancePrice: Price, discountPercentage: DiscountPercentage, productCategory: ProductCategory, address: Address, city: City, state: State, zipCode: ZipCode, coordinates: Coordinates, availabilityStatus: AvailabilityStatus): Promise<void>;
}
