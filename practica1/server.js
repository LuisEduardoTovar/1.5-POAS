// Importa los módulos necesarios
var express = require('express');
var bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set, update } = require('firebase/database');

var app = express();
app.use(bodyParser.json()); // Necesario para parsear el cuerpo de las peticiones HTTP

// Configuración de Firebase
var config = {
	apiKey: "AIzaSyBobT87pK4JNntF6825Vp4MBhJANcVAClw",
    authDomain: "proyecto-15-439520.firebaseapp.com",
    databaseURL: "https://proyecto-15-439520-default-rtdb.firebaseio.com",
    projectId: "proyecto-15-439520",
    storageBucket: "proyecto-15-439520.appspot.com",
    messagingSenderId: "736378041434",
    appId: "1:736378041434:web:b856934652bf30b3869463",
    measurementId: "G-DJT60EER74"
};

// Inicializa la aplicación de Firebase
const firebaseApp = initializeApp(config);
const database = getDatabase(firebaseApp);

// Fetch instances
app.get('/', function (req, res) {
    console.log("HTTP Get Request");
    const userReference = ref(database, "/Users/"); // Asegúrate de que sea "/Users/"
    
    get(userReference).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.json(snapshot.val());
        } else {
            res.send("No data available");
        }
    }).catch((error) => {
        console.log("The read failed: " + error);
        res.send("The read failed: " + error);
    });
});

// Create new instance
app.put('/', function (req, res) {
    console.log("HTTP Put Request");

    var userName = req.body.UserName;
    var name = req.body.Name;
    var age = req.body.Age;

    var referencePath = '/Users/' + userName + '/';
    const userReference = ref(database, referencePath);
    
    set(userReference, { Name: name, Age: age })
        .then(() => {
            res.send("Data saved successfully.");
        })
        .catch((error) => {
            res.send("Data could not be saved." + error);
        });
});

// Update existing instance
app.post('/', function (req, res) {
    console.log("HTTP POST Request");

    var userName = req.body.UserName;
    var name = req.body.Name;
    var age = req.body.Age;

    var referencePath = '/Users/' + userName + '/';
    const userReference = ref(database, referencePath);
    
    update(userReference, { Name: name, Age: age })
        .then(() => {
            res.send("Data updated successfully.");
        })
        .catch((error) => {
            res.send("Data could not be updated." + error);
        });
});

// Inicia el servidor
var PORT = 8080;
var server = app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
    
    var address = server.address();
    if (address) {
        var host = address.address || 'localhost';
        var port = address.port;
        console.log("Example app listening at http://%s:%s", host, port);
    } else {
        console.error("Server address is not available.");
    }
});

// Manejo de errores en el servidor
server.on('error', function (error) {
    console.error("Error starting server:", error);
});
