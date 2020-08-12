//const { database } = require("firebase-admin");

function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            verification()
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ... 
        });
}


function logIn() {

    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('pass2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function observer() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Existe usuario activo")
            appear(user);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
            console.log("No existe usuario activo");
            contenido.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Session not started!</strong> You should log in to see the content.
                </div>
            </div>

            `;
        }
    });
}

observer();

function appear(user) {
    var user = user;
    var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-danger" role="alert">
            <hr>
            <h2>Contact Form</h2>
                <h4 class="alert-heading">Welcome! ${user.email}</h4>
                <br>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-left">
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalTask">
                                    Add new contact
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="form-group">
                                <table class="table table-sm table-bordered text-center">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email Address</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody id="loadTable"></tbody>
                                </table>
                            </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <div class="text-left">
                                        <h5>Edit Contact</h5>
                                    </div>
                                    <div class="text-right">
                                        <button type="button" class="btn btn-warning" onclick="onClickUpdate()" id="update">Update</button>
                                    </div>
                                </div>
                                <div id="editData"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- Modal -->
            <div class="modal fade" id="modalTask" tabindex="-1" role="dialog" aria-labelledby="modalTask" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTask">Insert contact Info</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" id="emailUser" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input type="text" id="name" class="form-control" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <input type="text" id="lastname" class="form-control" placeholder="Last Name">
                            </div>
                            <div class="form-group">
                            <input type="text" id="tel" class="form-control" placeholder="Telephone">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onclick="onClickInsert()">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container card text-black bg-light mb-3 ml-3" style="max-width: 18rem;">
                <h5>Send message to</h5>
                <div class="card-header">${user.email}</div>

                <div class="card-body">
                    <button class="btn btn-success" onclick="sendEmail()">Send Email</button>
                </div>
            </div>     
            <hr>
            <button onclick="logOut()" class="btn btn-danger">Log out</button>
        </div>
        `;
    }

}

function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "anaozuna2699@gmail.com",
        Password: "Anamiguelina",
        To: '${user.email}',
        From: "<sender’s email address>",
        Subject: "This is the subject. Email message.",
        Body: "Your contact information was added to our firebase database.",
    }).then(
        message => alert("The mail was sent successfully.")
    );
}

function logOut() {

    firebase.auth().signOut()
        .then(function() {
            console.log("Login out.")

        })
        .catch(function(error) {
            console.log(error)
        })
}

function verification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("Email sent");
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
}

const userName = document.getElementById('userName');
const userLastName = document.getElementById('userLastName');
const userEmail = document.getElementById('userEmail');

//add

function addData(userId, userEmail, userName, userLastName) {
    firebase.database().ref('users/' + userId.value).set({
        user_name: userName.value,
        user_Lastname: userLastName.value,
        user_email: userEmail.value,
    });
}

//logic.js

//var db = firebase.database();

var update = document.getElementById('update');
//update.disabled = true;

function value(request) {
    return document.getElementById(request).value;
}

function asignation(request, response) {
    return document.getElementById(request).value = response;
}

function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}

function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

function insertContact(name, lastname, email) {
    firebase.database().ref('contact/').push({
        name: name,
        lastname: lastname,
        email: email
    });
}

function onClickInsert() {
    var name = value("name");
    var lastname = value("lastname");
    var email = value("emailUser");
    if (name.length == 0 || lastname.length == 0 || email.length == 0) {
        alert("Empty field");
    } else {
        inHTML("loadTable", "");
        insertContact(name, lastname, email);
        asignation("name", "");
        asignation("lastname", "");
        asignation("email", "");
        alert("Saved successfully");
    }
}

function updateContact(name, lastname, email, key) {
    firebase.database().ref('contact/' + key).update({
        email: email,
        name: name,
        lastname: lastname
    });
}

function onClickUpdate() {
    var name = value("nameEdit");
    var lastname = value("lastnameEdit");
    var email = value("emailEdit");
    var key = value("key");
    if (name.length == 0 || lastname.length == 0 || email.length == 0) {
        alert("Empty field");
    } else {
        inHTML("loadTable", "");
        updateContact(name, lastname, email, key);
        inHTML("editData", "");
        alert("Modify successfully");
        update.disabled = true;
    }
}

function removeContact(key) {
    if (confirm("Do you want to delete this contact?")) {
        inHTML("loadTable", "");
        firebase.database().ref('contact/' + key).remove();
    }
}

function table(name, lastname, email, key) {
    return '<tr><td>' + name + '</td><td>' + lastname + '</td><td>' + email + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + name + '\',\'' + lastname + '\',\'' + email + '\',\'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeContact(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}

function viewDataUpdate(name, lastname, email, key) {
    var response =
        '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="nameEdit" class="form-control" placeholder="Name" value=' + name + '>' +
        '<input type="text" id="lastnameEdit" class="form-control" placeholder="Last Name" value=' + lastname + '>' +
        '<input type="text" id="emailEdit" class="form-control" placeholder="Email" value=' + email + '>' + '</div>';

    inHTML('editData', response);
    update.disabled = false;
}
var reference = firebase.database().ref('contact/');
reference.on('value', function(datas) {
    var data = datas.val();
    $.each(data, function(nodo, value) {
        var sendData = table(value.name, value.lastname, value.email, nodo);
        printHTML('loadTable', sendData);
    });
});