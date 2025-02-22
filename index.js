// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    })
  }
  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    })
  }
  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    }).filter((obj, i, a) => a.indexOf(obj) === i)
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery =>{
      return delivery.customerId == this.id;
    })
  } 
  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal();
    })
  }
  totalSpent(){
    let amountSpent = 0;
    this.meals().forEach(function(meal){
    amountSpent += meal.price;
    })
    return amountSpent
  }
}

class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    })
  }
  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }
  static byPrice(){
    return store.meals.sort((a, b) => {
      return b.price - a.price;
    })
  }
}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    })
  }
  neighborhood(){
    
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    })
  }
  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    })
  }
}
