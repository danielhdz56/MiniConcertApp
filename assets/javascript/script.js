//Global
var monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var converter = {
  date: function(date) {
    // Gets the month
    var month = date.substring(date.indexOf("-")+1, date.indexOf("-")+3);
    month = Number(month);
    month = monthsArray[month-1];
    // Gets the day
    var day = date.substring(date.indexOf("-")+4, date.indexOf("-")+6);
    // Gets the year
    var year = date.substring(0,4);
    return month + ". " + day + ", " + year;
  },
  time: function(militaryTime) {
    var hour = militaryTime.substring(0,2);
    var minutes = militaryTime.substring(3,5);
    var time;
    hour = Number(hour);
    if (hour >12){
      console.log(hour)
      hour = hour - 12;
      time = hour + ":" + minutes + " p.m.";
      console.log(hour)
    }
    else if (hour === 0){
      hour = 12;
      time = hour + ":" + minutes + " a.m.";
    }
    else {
      time = hour + ":" + minutes + " a.m.";
    }
    return time;
  } 
};
// This function handles events where one button is clicked
$("#add-band").on("click", function(event) {
  event.preventDefault();
  var band = $("#band-input").val();
  var bandURL = "https://rest.bandsintown.com/artists/" + band + "?app_id=damndaniel";
  var eventURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=damndaniel";
  $.get(bandURL, function(res){
  	console.log(res)
  	var column = $('<div/>')
  	column.addClass('col-xs-12');
  	$('#bands-view').append(column);
  	var heading = $('<h2/>');
  	heading.addClass('text-center')
  	$(heading).append(res.name);
  	$(column).append(heading);
    	var image = $('<img/>');
    	image.addClass('center-block')
    	image.attr('src', res.image_url);
    	image.attr('width', "200px")
    	$(column).append(image);
    	var column2 = $('<div/>');
  });
  $.get(eventURL, function(res){
  	console.log(res);
  	$('#ticketTable').removeClass('collapse');
  	for(i=0; i<res.length; i++){
      //Creating all the rows
  		var tableRow = $('<tr/>');
  		$('#tableBody').append(tableRow);
      //Create Date
      var tableDataDate = $('<td/>');
      var dateAndTime = res[i].datetime;
      var justDate = (dateAndTime.substring(0, dateAndTime.indexOf("T")));
      $(tableRow).append(tableDataDate);
      tableDataDate.append(converter.date(justDate));
      //Create Time
      var justTime = (dateAndTime.substring(dateAndTime.indexOf("T")+1));
      var tableDataTime = $('<td/>');
      $(tableRow).append(tableDataTime);
      tableDataTime.append(converter.time(justTime));
      //Create City
      var tableDataCity = $('<td/>');
      $(tableRow).append(tableDataCity);
      tableDataCity.append((res[i].venue.city));
      //Create Country
      var tableDataCountry = $('<td/>');
      $(tableRow).append(tableDataCountry);
      tableDataCountry.append((res[i].venue.country));
      //Create Ticket Status and url link
      var tableDataTicketStatus = $('<td/>');
      $(tableRow).append(tableDataTicketStatus);
      var anchor = $('<a/>');
      $(tableDataTicketStatus).append(anchor);
      if(res[i].offers[0] !== undefined){
        $(anchor).append('Available');
        $(anchor).attr('href', (res[i].offers[0]).url);
        $(anchor).attr('target', '_blank');
      }
      else{
        $(anchor).append('Not available');
        $(anchor).addClass('disabled')
      }
  	}
  });
});