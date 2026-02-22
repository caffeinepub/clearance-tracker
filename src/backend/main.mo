import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type StoreName = Text;

  type ProductName = Text;
  type ProductCategory = Text;
  type Address = Text;
  type City = Text;
  type State = Text;

  type ZipCode = Nat;
  type Coordinates = (Float, Float);
  type Price = Float;
  type Timestamp = Time.Time;
  type DiscountPercentage = Float;

  type AvailabilityStatus = {
    #available;
    #limited_quantity;
    #out_of_stock;
  };

  type StoreLocation = {
    address : Address;
    city : City;
    state : State;
    zip_code : ZipCode;
    coordinates : Coordinates;
  };

  type ClearanceItem = {
    id : Nat;
    store_name : StoreName;
    product_name : ProductName;
    original_price : Price;
    clearance_price : Price;
    discount_percentage : DiscountPercentage;
    product_category : ProductCategory;
    store_location : StoreLocation;
    availability_status : AvailabilityStatus;
    last_update : Timestamp;
  };

  var clearanceItemsId = 0;
  let clearanceItems = Map.empty<Nat, ClearanceItem>();

  module ClearanceItem {
    public func compareById(a : ClearanceItem, b : ClearanceItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public shared ({ caller }) func addClearanceItem(
    storeName : StoreName,
    productName : ProductName,
    originalPrice : Price,
    clearancePrice : Price,
    discountPercentage : DiscountPercentage,
    productCategory : ProductCategory,
    address : Address,
    city : City,
    state : State,
    zipCode : ZipCode,
    coordinates : Coordinates,
    availabilityStatus : AvailabilityStatus,
  ) : async Nat {
    let newItem : ClearanceItem = {
      id = clearanceItemsId;
      store_name = storeName;
      product_name = productName;
      original_price = originalPrice;
      clearance_price = clearancePrice;
      discount_percentage = discountPercentage;
      product_category = productCategory;
      store_location = {
        address;
        city;
        state;
        zip_code = zipCode;
        coordinates;
      };
      availability_status = availabilityStatus;
      last_update = Time.now();
    };

    clearanceItems.add(clearanceItemsId, newItem);
    clearanceItemsId += 1;
    newItem.id;
  };

  public shared ({ caller }) func updateClearanceItem(
    id : Nat,
    storeName : StoreName,
    productName : ProductName,
    originalPrice : Price,
    clearancePrice : Price,
    discountPercentage : DiscountPercentage,
    productCategory : ProductCategory,
    address : Address,
    city : City,
    state : State,
    zipCode : ZipCode,
    coordinates : Coordinates,
    availabilityStatus : AvailabilityStatus,
  ) : async () {
    let updatedItem : ClearanceItem = {
      id;
      store_name = storeName;
      product_name = productName;
      original_price = originalPrice;
      clearance_price = clearancePrice;
      discount_percentage = discountPercentage;
      product_category = productCategory;
      store_location = {
        address;
        city;
        state;
        zip_code = zipCode;
        coordinates;
      };
      availability_status = availabilityStatus;
      last_update = Time.now();
    };

    if (not clearanceItems.containsKey(id)) {
      Runtime.trap("Clearance item does not exist");
    };
    clearanceItems.add(id, updatedItem);
  };

  public shared ({ caller }) func deleteClearanceItem(id : Nat) : async () {
    if (not clearanceItems.containsKey(id)) {
      Runtime.trap("Clearance item does not exist");
    };
    clearanceItems.remove(id);
  };

  public query ({ caller }) func getClearanceItem(id : Nat) : async ClearanceItem {
    switch (clearanceItems.get(id)) {
      case (null) { Runtime.trap("Clearance item does not exist") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getClearanceItemsByStore(storeName : StoreName) : async [ClearanceItem] {
    let storeFilterItems = List.empty<ClearanceItem>();
    for ((_, item) in clearanceItems.entries()) {
      if (item.store_name == storeName) {
        storeFilterItems.add(item);
      };
    };
    storeFilterItems.toArray().sort(ClearanceItem.compareById);
  };

  public query ({ caller }) func getClearanceItemsByLocation(city : City, state : State) : async [ClearanceItem] {
    let locationArray = clearanceItems.values().toArray();
    let filterArray = locationArray.filter(
      func(item) { item.store_location.city == city and item.store_location.state == state }
    );
    filterArray.sort(ClearanceItem.compareById);
  };

  public query ({ caller }) func getClearanceItemsByPriceRange(minPrice : Price, maxPrice : Price) : async [ClearanceItem] {
    let priceRangeArray = clearanceItems.values().toArray();
    let filterArray = priceRangeArray.filter(
      func(item) { item.clearance_price >= minPrice and item.clearance_price <= maxPrice }
    );
    filterArray.sort(ClearanceItem.compareById);
  };
};
