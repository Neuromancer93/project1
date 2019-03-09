/*    FIREBASE BOILERPLATE    */
var config = {
    apiKey: "AIzaSyDWe0UI_fJcDGtzqvfFuvHPkbAZddTW9cI",
    authDomain: "project1-36185.firebaseapp.com",
    databaseURL: "https://project1-36185.firebaseio.com",
    projectId: "project1-36185",
    storageBucket: "project1-36185.appspot.com",
    messagingSenderId: "112275278683"
};
firebase.initializeApp(config);
var database = firebase.database();

function ISBN_to_firebase(ISBN){
	var PATH = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
	var queryURL = PATH + ISBN;
	$.ajax({
    	url: queryURL,
    	method: "GET"
	}).then(function (r) {
    	console.log(r);
   		console.log(r.items[0].volumeInfo.authors[0]);
   		console.log(r.items[0].volumeInfo.title);
   		console.log(r.items[0].volumeInfo.categories[0]);
   		console.log(r.items[0].volumeInfo.pageCount);
		console.log(r.items[0].volumeInfo.publishedDate);

		database.ref(userName).push({
			author: r.items[0].volumeInfo.authors[0],
			genre: r.items[0].volumeInfo.title,
			title: r.items[0].volumeInfo.categories[0],	
			pages: r.items[0].volumeInfo.pageCount,
			date: r.items[0].volumeInfo.publishedDate

		});
	});
}
TestingISBN = "0451524934";
ISBN_to_firebase(TestingISBN);

var testing = "testing"
var userName = "matt"
database.ref(userName).on("child_added", function (snapshot) {
    var book = snapshot.val();
    var row = $("<tr>");
    row.append($("<th>").text(book.author));
    row.append($("<th>").text(book.genre));
    row.append($("<th>").text(book.title));
    row.append($("<th>").text(book.date));
    row.append($("<th>").text(book.pages));
    row.append($("<th>").text("..."));
    $("#user-data").append(row);
});
