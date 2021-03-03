// // Extract Date
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dateofday = ["1th", "2th", "3th", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21th", "22th", "23th", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31th"];
var now = new Date();
var theday = now.getDay();
var nameofday = dayNames[theday];
var dat = now.getDate();
var nameofdate = dateofday[dat];

// assign Dates to html dom

var currentdate = document.getElementById("day");
currentdate.innerHTML = nameofday;
var currentd = document.getElementById("dt");
currentd.innerHTML = "," + " " + nameofdate;

// Get value globally
var add = document.getElementById('text');



// // Add todo
function Addtodo() {
    if (add.value !== '') {
        // ref variable 
        var database = firebase.database().ref('Todo');
        var key = database.push().key;
        // insert in firebase

        var addValue = {
            add: add.value,
            key: key
        }

        //  insert in database   
        database.child(key).set(addValue);
        add.value = '';
        // alert("Your task insert Sucessfully");
        setInterval(function () {
            location.reload();
        }, 100);
    }

    else {

        alert("Please Add something");
        location.reload();

    }
}



// GetDate from Firebase

function GetData() {
    firebase.database().ref('Todo').on('child_added', function (data) {
        // Creating nodes
        var main = document.getElementById('main');
        var text = document.createTextNode(data.val().add);
        var div = document.createElement('div');
        div.setAttribute('class', 'form-check');
        var input = document.createElement('input');
        input.setAttribute('class', 'form-check-input');
        input.setAttribute('id', 'flexCheckIndeterminate');
        input.setAttribute('type', 'checkbox');
        var span = document.createElement('span');
        span.setAttribute('class', 'form-check-label');
        var editxt = document.createTextNode("Edit");
        var editbtn = document.createElement('button');
        editbtn.appendChild(editxt)
        var dlttxt = document.createTextNode("Delete");
        var dltbtn = document.createElement('button');
        dltbtn.appendChild(dlttxt);
        editbtn.setAttribute("class", "btn new");
        dltbtn.setAttribute("class", "btn new");
        editbtn.setAttribute('onclick', 'edit(this)');
        dltbtn.setAttribute('onclick', 'Delete(this)');
        dltbtn.setAttribute('id', data.val().key);
        editbtn.setAttribute('id', data.val().key);
        span.appendChild(text);
        div.appendChild(input);
        div.appendChild(span);
        div.appendChild(editbtn);
        div.appendChild(dltbtn);
        main.appendChild(div);
    })
}

GetData()



// delete datafrom nodes and firebase

function Delete(e) {
    firebase.database().ref('Todo').child(e.id).remove();
    e.parentNode.remove();
}

// edit Task

function edit(e) {
    var val = prompt("Enter Updated Todo");
    var edit = {
        add: val,
        key: e.id
    }
    firebase.database().ref('Todo').child(e.id).set(edit);
    e.parentNode.firstChild.nodeValue = val;
    var stop = setInterval(function () {
        location.reload();
    }, 100);
}