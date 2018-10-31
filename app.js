
// build store objects
var stores = []; // to retain all Store object instances
function Store(storeName, minHourlyTraffic, maxHourlyTraffic, avgPurchase) {
  // console.log('this', this);
  // properties that are passed in to constructor
  this.storeName = storeName;
  this.minHourlyTraffic = minHourlyTraffic;
  this.maxHourlyTraffic = maxHourlyTraffic;
  this.avgPurchase = avgPurchase;
  // properties that are used within the object instance for calculation and data storage
  this.dailySales = [];
  this.dailyCookieTotal = 0;
  // build sales table immediately when Store object instance is created
  this.populateSalesArray(this.minHourlyTraffic, this.maxHourlyTraffic, this.avgPurchase);
  stores.push(this); // saves current Store object instance in 'stores' array
}

// prototype functions for all store objects
Store.prototype.getHoursOfOp = function(hoursAfterOpening) { // populate dailySales[].time
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

Store.prototype.getHourlyCustomers = function(min, max) { // populate dailySales[].customers
  var hourlyCustomers = Math.floor(Math.random() * (max-min + 1)) + min;
  // console.log('hourlyCustomers', hourlyCustomers);
  return hourlyCustomers;
};

Store.prototype.getHourlySales = function(custThisHour, cookiesPerCust) { // populate dailySales[].sales
  var hourlySales = Math.round(custThisHour * cookiesPerCust);
  // console.log('hourlySales', hourlySales);
  return hourlySales;
};

Store.prototype.populateSalesArray = function(minCust, maxCust, avgCookiesPerCust) { // use get... methods to populate sales array
  var custThisHour = 0;
  var salesThisHour = 0;
  var setClock = 0;
  for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
    custThisHour = this.getHourlyCustomers(minCust, maxCust);
    salesThisHour = this.getHourlySales(custThisHour, avgCookiesPerCust);
    setClock = this.getHoursOfOp(hoursAfterOpening);
    this.dailySales[hoursAfterOpening] = {time: setClock, sales: salesThisHour, customers: custThisHour};
    // console.log('salesThisHour', salesThisHour);
    this.dailyCookieTotal += salesThisHour;
  }
  // console.log('dailySales', this.dailySales);
};

Store.prototype.render = function () {
  // create and populate data row for a store
  var rowGenericEl = document.createElement('tr'); // create row item
  // create, fill, and append store name row header  <th>
  var rowheadGenericEl = document.createElement('th'); // create row header (store name)
  rowheadGenericEl.className = 'borderColumn';
  rowheadGenericEl.textContent = this.storeName;
  rowGenericEl.appendChild(rowheadGenericEl);
  // create, fill append sales data cells for single store  <td>
  var tdGenericEl = 0; // generic placeholder to be recycled while generating and appending <td> cells
  for (var j=0; j<this.dailySales.length; j++) { // create and append single hourly sales data element
    tdGenericEl = document.createElement('td');
    // console.log('tdGenericEl', tdGenericEl);
    tdGenericEl.textContent = this.dailySales[j].sales; // point to sales data for this store at this hour
    rowGenericEl.appendChild(tdGenericEl);
  }
  // create, fill, and append store daily totals row header  <th>
  var rowtailGenericEl = document.createElement('th'); // create row header (store name)
  rowtailGenericEl.className = 'borderColumn';
  rowtailGenericEl.textContent = this.dailyCookieTotal;
  rowGenericEl.appendChild(rowtailGenericEl);
  return rowGenericEl;
};

// global function to sum an array
function sumArray (someArray) {
  var arraySum = 0;
  for (var i=0; i<someArray.length; i++) {
    arraySum += someArray[i];
  }
  return arraySum;
}

// create Store object instances
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

// console.log('stores', stores);

// function to render table with sales data for all stores
function makeTable () {
  // create containers and tie to id
  var mainEl = document.getElementById('main-content');
  var tableTitle = document.createElement('h1');
  var tableEl = document.createElement('table');
  var topRowEl = document.createElement('tr');
  var bottomRowEl = document.createElement('tr');
  // create table title
  tableTitle.textContent = 'Daily Demand (by Location)';
  mainEl.appendChild(tableTitle);
  // BUILD TOP ROW
  // create top left corner cell
  var thFirstColEmpty = document.createElement('th');
  thFirstColEmpty.id = 'topLeftCorner';
  thFirstColEmpty.textContent = ' ';
  topRowEl.appendChild(thFirstColEmpty); // append top left corner cell
  // add time slot headings
  var thGenericEl = 0; // use as element holder in cell populating loops
  for (var column = 0; column < stores[0].dailySales.length; column++) {
    thGenericEl = document.createElement('th');
    thGenericEl.textContent = stores[0].dailySales[column].time; // point to sales data for this store at this hour
    topRowEl.appendChild(thGenericEl);
  }
  var thLastColEmpty = document.createElement('th');
  thLastColEmpty.className = 'borderColumn';
  thLastColEmpty.textContent = 'Store Totals';
  topRowEl.appendChild(thLastColEmpty);
  tableEl.appendChild(topRowEl);
  // build rows for each store
  for (var dataRow = 0; dataRow < stores.length; dataRow++) {
    var addRow = stores[dataRow].render();
    tableEl.appendChild(addRow);
  }
  // BUILD LAST ROW
  // create bottom left corner cell
  var thFirstColTotals = document.createElement('th');
  thFirstColTotals.className = 'borderColumn';
  thFirstColTotals.textContent = 'Totals';
  bottomRowEl.appendChild(thFirstColTotals); // append top left corner cell
  // add time slot headings
  var thAnotherGenericEl = 0; // use as element holder in cell populating loops
  for (column = 0; column < stores[0].dailySales.length; column++) {
    thAnotherGenericEl = document.createElement('th');
    thAnotherGenericEl.textContent = hourlyTotals[column]; // point to sales data for this store at this hour
    bottomRowEl.appendChild(thAnotherGenericEl);
  }
  // create bottom right corner cell
  var thGrandTotalEl = document.createElement('th');
  thGrandTotalEl.className = 'borderColumn';
  thGrandTotalEl.textContent = dailyTotalsAllStores;
  bottomRowEl.appendChild(thGrandTotalEl);
  tableEl.appendChild(bottomRowEl);
  mainEl.appendChild(tableEl);
}

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
// console.log('hourlyTotals', hourlyTotals);
var dailyTotalsAllStores = sumArray(hourlyTotals);

// render table
makeTable();