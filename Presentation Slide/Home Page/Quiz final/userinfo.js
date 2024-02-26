// session storage is used to store the necessary details which are to be displayed in the final page
// variables are declared for these details
let user_name = sessionStorage.getItem("name");
let user_points = sessionStorage.getItem("points");
let time_taken = sessionStorage.getItem("time");
let user_badge = sessionStorage.getItem("badge");

//document.querySelector is used to return the first element with the selector and is assigned to the variables declared above
document.querySelector("span.name").innerHTML = user_name;
document.querySelector("span.points").innerHTML = user_points;
document.querySelector("span.time").innerHTML = time_taken;
document.querySelector("span.badge").innerHTML = user_badge;