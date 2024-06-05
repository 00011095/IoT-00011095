// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd7sNpOQTFFVoQSQkYz7YSkZCpMNBhCNE",
    authDomain: "iot00011095.firebaseapp.com",
    databaseURL: "https://iot00011095-default-rtdb.firebaseio.com",
    projectId: "iot00011095",
    storageBucket: "iot00011095.appspot.com",
    messagingSenderId: "229269114472",
    appId: "1:229269114472:web:07ad9b120de6424d85b5dd",
    measurementId: "G-834FW632JQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Initialize variables
let motorOpenCommand = false;
let motorOpenStatus = 0;

// Database references
const dbMotorCommand = database.ref("DoorOpenCommand");
const dbDoorOpenStatus = database.ref("DoorOpen");

// Fetch data from Firebase and update UI
dbDoorOpenStatus.on("value", snapshot => {
    motorOpenStatus = snapshot.val();
    document.getElementById("door_open_status").textContent = motorOpenStatus;
});

dbMotorCommand.on("value", snapshot => {
    motorOpenCommand = snapshot.val();
    updateButtonStatus("motorBtn", motorOpenCommand);
});


// Update button status based on database value
function updateButtonStatus(btnId, value) {
    const btn = document.getElementById(btnId);
    btn.textContent = value ? "OPEN" : "CLOSE";
    btn.classList.toggle("btn-primary", value);
    btn.classList.toggle("btn-outline-danger", !value);
}

// Button click handlers
document.getElementById("motorBtn").addEventListener("click", () => {
    firebase.database().ref("DoorOpenCommand").set(!motorOpenCommand ? 1 : 0);
});

