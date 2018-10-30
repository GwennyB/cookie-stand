
// build store objects

var stores = [];
// var dailySalesAllStores=[];


function Store(storeName, minHourlyTraffic, maxHourlyTraffic, avgPurchase) {

  console.log('this', this);

  this.storeName = storeName;
  this.minHourlyTraffic = minHourlyTraffic;
  this.maxHourlyTraffic = maxHourlyTraffic;
  this.avgPurchase = avgPurchase;

  this.dailySales = [];
  this.dailyCookieTotal = 0;

  this.populateSalesArray(this.minHourlyTraffic, this.maxHourlyTraffic, this.avgPurchase);
  stores.push(this);
  // dailySalesAllStores.push(this.dailySales);
  this.render();
}

// prototype functions for all store objects
Store.prototype.getHoursOfOp = function(hoursAfterOpening) {  // populate dailySales[].time
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}:00am `;
  } else if (hoursAfterOpening === 6) {
    time = '12:00pm ';
  } else {
    time = `${hoursAfterOpening-6}:00pm `;
  }
  return time;
};

Store.prototype.getHourlyCustomers = function(min, max) {   // populate dailySales[].customers
  var hourlyCustomers = Math.floor(Math.random() * (max-min + 1)) + min;
  console.log('hourlyCustomers', hourlyCustomers);
  return hourlyCustomers;
};

Store.prototype.getHourlySales = function(custThisHour, cookiesPerCust) {  // populate dailySales[].sales
  var hourlySales = Math.round(custThisHour * cookiesPerCust);
  console.log('hourlySales', hourlySales);
  return hourlySales;
};

Store.prototype.populateSalesArray = function(minCust, maxCust, avgCookiesPerCust) {   // reduce; use get... methods to populate sales array
  var custThisHour = 0;
  var salesThisHour = 0;
  var setClock = 0;
  for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
    custThisHour = this.getHourlyCustomers(minCust, maxCust);
    salesThisHour = this.getHourlySales(custThisHour, avgCookiesPerCust);
    setClock = this.getHoursOfOp(hoursAfterOpening);
    this.dailySales[hoursAfterOpening] = {time: setClock, sales: salesThisHour, customers: custThisHour};
    console.log('salesThisHour', salesThisHour);
    this.dailyCookieTotal += salesThisHour;
  }
  console.log('dailySales', this.dailySales);
};

Store.prototype.render = function () {
  //create elements
  //create content for elements
  //append elements to page at anchor id
  
  // create and populate data row for a store   
  var rowGenericEl = document.createElement('tr');  // create row item

  // create, fill, and append store name row header  <th> 
  var rowheadGenericEl = document.createElement('th');  // create row header (store name)
  rowheadGenericEl.textContent = this.storeName;
  rowGenericEl.appendChild(rowheadGenericEl);
  
  
  // create, fill append sales data cells for single store  <td>
  var tdGenericEl = 0;  // generic placeholder to be recycled while generating and appending <td> cells
  for (var j=0; j<this.dailySales.length; j++) {    // create and append single hourly sales data element
    tdGenericEl = document.createElement('td');
    tdGenericEl.textContent = this.dailySales[j].sales; // point to sales data for this store at this hour
    rowGenericEl.appendChild(document.createElement('td'));
  }
  
  // create, fill, and append store daily totals row header  <th>
  var rowtailGenericEl = document.createElement('th');  // create row header (store name)
  rowtailGenericEl.textContent = this.dailyCookieTotal;
  rowGenericEl.appendChild(rowtailGenericEl);

  // append this store's data row to the global table

};

// create store objects
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

console.log('stores', stores);


// calculate total hourly sales for all stores
var hourlyTotals = [];
var thisHourThisStore = 0;
for (var i=0; i<stores[0].dailySales.length; i++) {
  thisHourThisStore = 0;
  for (var j=0; j<stores.length; j++) {
    thisHourThisStore += parseInt(stores[j].dailySales[i].sales);
  }
  hourlyTotals.push(thisHourThisStore);
}
console.log('hourlyTotals', hourlyTotals);
var dailyTotalsAllStores = sumArray(hourlyTotals);


// function to sum an array
function sumArray (someArray) {
  var arraySum = 0;
  for (var i=0; i<someArray.length; i++) {
    arraySum += someArray[i];
  }
  return arraySum;
}

function makeTable () {
  // create containers and tie to id
  var mainEl = document.getElementById('main-content');
  var container = document.createElement('section');
  var rowEl = stores[0].render();
  container.appendChild(rowEl);
  mainEl.appendChild(container);
}

makeTable();