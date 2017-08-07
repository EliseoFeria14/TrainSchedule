console.log("JS is linked")
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAUP-BodGwxeBOJ9EpESX_cf6RhhBB92PI",
		authDomain: "trainschedule-f613c.firebaseapp.com",
		databaseURL: "https://trainschedule-f613c.firebaseio.com",
		projectId: "trainschedule-f613c",
		storageBucket: "trainschedule-f613c.appspot.com",
		messagingSenderId: "1060322191008"
	};

	firebase.initializeApp(config);

	var database = firebase.database();
	var trainNameInput = "";
	var destinationNameInput = "";
	var startTrainTime = "";
	var trainFrequency = "";

$(document).ready(function(){

//getting the info from the form fields and saving to firebase
	$('#submitInfo').on("click",function(event){

		

		var trainNameInput = $('#TrainNameInput').val().trim();
		console.log(trainNameInput);

		var destinationNameInput = $('#destinationInput').val().trim();
		console.log(destinationNameInput);

		var startTrainTime = $('#initialTrainTime').val().trim()
		console.log(startTrainTime);

		var trainFrequency = $('#frequencyInput').val().trim();
		console.log(trainFrequency);

		if (trainNameInput == "" || destinationInput == "" || startTrainTime == "" || trainFrequency == ""){
			alert("Fill out all form fields")
		} else{
		var newTrain = {
			Name: trainNameInput,
			Destination: destinationNameInput,
			FirstTime: startTrainTime,
			Frequency: trainFrequency
		};

		database.ref().push(newTrain);

		console.log(newTrain.Name);
		console.log(newTrain.Destination);
		console.log(newTrain.FirstTime);
		console.log(newTrain.Frequency);

		$("#TrainNameInput").val("");
		$("#destinationInput").val("");
		$("#initialTrainTime").val("");
		$("#frequencyInput").val("");
		};

	});
//functions converting the time using moment js and give th numbers for Next Arrival and Minutes away and Append to tbody
	database.ref().on("child_added", function(chidlSnapshot, prevChildKey){

		var dbTrainName = chidlSnapshot.val().Name;
		var dbDestination = chidlSnapshot.val().Destination;
		var dbFirstTime = chidlSnapshot.val().FirstTime;
		var dbFrequency = chidlSnapshot.val().Frequency;

		console.log(dbTrainName);
		console.log(dbDestination);
		console.log(dbFirstTime);
		console.log(dbFrequency);

		var firstTimeConverted = moment(dbFirstTime, "hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		var currentTime = moment();
		console.log("current time: " + moment(currentTime).format("hh:mm"));

		var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("Diff in time: " + timeDiff);

		var timeRemainder = timeDiff % dbFrequency;
		console.log(timeRemainder);

		var nextTrainMin = dbFrequency - timeRemainder;
		console.log("minutes till next train: "+ nextTrainMin);

		var nextTrainArrival = moment().add(nextTrainMin,"minutes");
		console.log("arrival time: " + moment(nextTrainArrival).format("hh:mm"));
		var trainArrivalDisplay= moment(nextTrainArrival).format("hh:mm");
		$('#tableEntry').append("<tr><td>" + dbTrainName + "</td><td>" + dbDestination + "</td><td>" +
  dbFrequency + "</td><td>" + trainArrivalDisplay + "</td><td>" +nextTrainMin + "</td></tr>");
	});
});