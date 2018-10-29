
// BUILD LOCATION OBJECTS

var pikePlace = {
  minHourlyTraffic: 23,
  maxHourlyTraffic: 65,
  avgPurchase: 6.3,
  dailySales: [],

  trafficSimulated: function() {
    return randomInRange(this.minHourlyTraffic, this.maxHourlyTraffic);
  },

  salesTable: function() {
    for (var hoursAfterOpening = 0; hoursAfterOpening < 14; hoursAfterOpening++) {
      //var fixClock = setTime(hoursAfterOpening);
      //var calcSales = parseInt(this.trafficSimulated() * this.avgPurchase);
      //console.log('calcSales', calcSales);
      this.dailySales[hoursAfterOpening] = {time: setTime(hoursAfterOpening), sales: parseInt(this.trafficSimulated() * this.avgPurchase) };
      console.log('this.dailySales', this.dailySales);
    }
  }
};



// POPULATE SALES TABLES
pikePlace.salesTable();




// BUILD TABLE USING OBJECT LITERALS






// COMMON FUNCTIONS

function randomInRange(min,max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function setTime(hoursAfterOpening) {
  var time = '';
  if (hoursAfterOpening < 6) {
    time = `${hoursAfterOpening+6}am:`;
  } else if (hoursAfterOpening === 6) {
    time = '12pm:';
  } else {
    time = `${hoursAfterOpening-6}pm:`;
  }
  return time;
}



