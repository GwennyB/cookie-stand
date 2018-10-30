
// BUILD LOCATION OBJECTS

function Store(storeName,minHourlyTraffic, maxHourlyTraffic, avgPurchase) {
  this.storeName = storeName;
  this.minHourlyTraffic = minHourlyTraffic;
  this.maxHourlyTraffic = maxHourlyTraffic;
  this.avgPurchase = avgPurchase;

  this.dailySales = [];
  this.dailyCookieTotal = 0;

  // stores.push(this);     // ***FIX: need to create array of store objects
}

Store.prototype.getHoursOfOp = function(hoursAfterOpening) {  // populate dailySales[].time
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}am: `;
  } else if (hoursAfterOpening === 6) {
    time = '12pm: ';
  } else {
    time = `${hoursAfterOpening-6}pm: `;
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
    this.dailySales[hoursAfterOpening] = {time: setClock, sales: salesThisHour + ' cookies', customers: custThisHour};
    console.log('salesThisHour', salesThisHour);
    this.dailyCookieTotal += salesThisHour;
  }
  console.log('dailySales', this.dailySales);
};

Store.prototype.render = function () {
  //create elements
  //create content for elements
  //append elements to page at anchor id
  var mainEl = document.getElementById('main-content');
  var container = document.createElement('section');
  var listBoxEl = document.createElement('ul');
  var listHeadingEl = document.createElement('h3');
  var totalSalesEl = document.createElement('li');
  
  listHeadingEl.textContent = this.storeName;
  totalSalesEl.textContent = 'Total: ' + this.dailyCookieTotal;
  
  listBoxEl.appendChild(listHeadingEl);

  var timeSlot = 0;    // append list items to list box
  for (var salesListWalk = 0; salesListWalk < this.dailySales.length; salesListWalk++) {
    timeSlot = document.createElement('li');
    timeSlot.textContent = this.dailySales[salesListWalk].time + this.dailySales[salesListWalk].sales; // *** CONSIDER ADDING LIST TEXT HERE ***
    listBoxEl.appendChild(timeSlot);
  }
  
  listBoxEl.appendChild(totalSalesEl);
  
  container.appendChild(listBoxEl);

  mainEl.appendChild(container);
};


var pikeStore = new Store('1st and Pike', 23, 65, 6.3);
var seatacStore = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenterStore = new Store('Seattle Center', 11, 38, 3.7);
var capHillStore = new Store('Capitol Hill', 20, 38, 2.3);
var alkiStore = new Store('Alki', 2, 16, 4.6);

// POPULATE AND RENDER SALES TABLES
pikeStore.populateSalesArray(pikeStore.minHourlyTraffic, pikeStore.maxHourlyTraffic, pikeStore.avgPurchase);
pikeStore.render();

seatacStore.populateSalesArray(seatacStore.minHourlyTraffic, seatacStore.maxHourlyTraffic, seatacStore.avgPurchase);
seatacStore.render();

seattleCenterStore.populateSalesArray(seattleCenterStore.minHourlyTraffic, seattleCenterStore.maxHourlyTraffic, seattleCenterStore.avgPurchase);
seattleCenterStore.render();

capHillStore.populateSalesArray(capHillStore.minHourlyTraffic, capHillStore.maxHourlyTraffic, capHillStore.avgPurchase);
capHillStore.render();

alkiStore.populateSalesArray(alkiStore.minHourlyTraffic, alkiStore.maxHourlyTraffic, alkiStore.avgPurchase);
alkiStore.render();


