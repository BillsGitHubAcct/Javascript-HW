// set up global variables
var searchDate = "";  
var searchCity = "";
var searchState = "";
var searchCountry = "";
var searchShape = "";

function mainProcessing(){
	// Calls to function with anonymous callback
	getData(function(response) {		
		jsonresponse = JSON.parse(response);
	//	console.log('searchDate = ' + searchDate);
	//	console.log('searchCity = ' + searchCity);
	//  console.log('searchState = ' + searchState);
	//	console.log('searchCountry = ' + searchCountry);
	//	console.log('searchShape = ' + searchShape);
		if (searchDate != ""){
			jsonresponse = filteredResults(jsonresponse,"datetime")};
		if (searchCity != ""){
			jsonresponse = filteredResults(jsonresponse,"city")};
		if (searchState != ""){
			jsonresponse = filteredResults(jsonresponse,"state")};
		if (searchCountry != ""){
			jsonresponse = filteredResults(jsonresponse,"country")};
		if (searchShape != ""){
			jsonresponse = filteredResults(jsonresponse,"shape")};

	//	console.log('after response is returned');
	//	console.log(jsonresponse);
		// Generate table from parsed JSON Values
		createTable(jsonresponse);
		    
		})
	};

// This function is called when the submit button is clicked
// It first gets and assigns global variables and then calls
// the main processing section which gets and displays selected data,
function handleSubmitButtonClick() {
//
  searchDate = document.getElementById("dateInput").value;
  searchCity = document.getElementById("cityInput").value;
  searchState = document.getElementById("stateInput").value;
  searchCountry = document.getElementById("countryInput").value;
  searchShape = document.getElementById("shapeInput").value;
  document.getElementById('dateInput').value = "";
  document.getElementById('cityInput').value = "";
  document.getElementById('stateInput').value = "";
  document.getElementById('countryInput').value = "";
  document.getElementById('shapeInput').value = "";
  mainProcessing();
};
// The following function call read from the JSON file added to my github pages	
function getData(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'https://billsgithubacct.github.io/Javascript-HW/dataFull.json', true);
	//xobj.open('GET', 'https://billsgithubacct.github.io/Javascript-HW/dataPart.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 ) {
		// .open will NOT return a value but simply returns undefined in async mode so use a callback
			callback(xobj.responseText);
		}
    }
	xobj.send(null);
	}
	// First time display table with no filtering a.k.a using  
	// "Dummy" value in searchDate to prohibit filtering the data
mainProcessing();
	
function filteredResults(data, field) {
		console.log('got here with field = ' + field)
		if (field == "datetime"){
			// console.log('did datetime');
			return data.filter(function(d) {
				return d.datetime.indexOf(searchDate) != -1;
							})
		}
		else if (field == "city"){
			// console.log('did city');
			return data.filter(function(d) {
				return d.city.indexOf(searchCity) != -1;
							})
		}
		else if (field == "state"){
			// console.log('did state');
			return data.filter(function(d) {
				return d.state.indexOf(searchState) != -1;
							})
		}			   
		else if	(field == "country"){
			// console.log('did country');
			return data.filter(function(d) {
				return d.country.indexOf(searchCountry) != -1
							})
		}
		else { //console.log('did shape');
			return data.filter(function(d) {
				return d.shape.indexOf(searchShape) != -1;
							})
		}
	};

// The following function dynamically creates a table based on parsed JSON dataSet passed in
function createTable(dataSet) {
        // Extract value from HTML header
        // 
        var col = [];
        for (var i = 0; i < dataSet.length; i++) {
            for (var key in dataSet[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Create dynamic table
        var table = document.createElement("table");

        
		// Create HTML table header row using the extracted headers above

        var tr = table.insertRow(-1);                   // table row.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // table header
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // Add JSON data to the table as rows
				
        for (var i = 0; i < dataSet.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = dataSet[i][col[j]];
            }
        }

        // Finally add the table to the document the showData id
        var divShowData = document.getElementById("showData");
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
		
    };