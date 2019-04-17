
/* Modules Import */
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose'); 
const xml2js = require('xml2js'); 
const fs = require('fs'); 
/* SET port */ 
const PORT = 5000;

/* XML Parser */ 
const parser = new xml2js.Parser({ attrkey: "ATTR" });

/* App, CORS and STATIC */
const app = express();
app.use('/files', express.static('uploads'))
app.use(cors());


mongoose.connect('mongodb://localhost:127.0.0.1/unfound', {useNewUrlParser: true});

/* SCHEMA FOR VEHICLES */ 
const Schema = mongoose.Schema; 

const VehicleSchema = new Schema({
    vehicle_name: String, 
    vehicle_id: String,
    frame_material: String, 
    wheels : Object, 
    powertrain: String, 
    fileName: String, 
    timestamp: String
}); 

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

/* Multer File Storage Middleware */ 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

/* Create an instance of multer */ 
const upload = multer({
    storage
}); 


const predictName = (powertrain, wheels, frame_material) => {
    if(powertrain === 'human'){
        if(frame_material === 'plastic'){
                return 'big wheel'; 
        }else{
                return 'bicycle';  
        }
    }
    else if(powertrain === 'internal combustion'){
        if(wheels.length == 2){
            return 'motorcycle';
        }
        else if(wheels.length == 4){
            return 'car'; 
        }
    }
    else if(powertrain === 'bernoulli'){
        return 'hang glider'; 
    }

    return ""; 
}


/* API : TestAPI */ 
app.get('/test', (req,res) => {
    res.json({"express": "working" }); 
})

/* API : GetVehicles */ 
app.get('/vehicleList', (req, res) => {
    Vehicle.find({}, function(err, vehicles) {
        res.json({"vehicles": vehicles});
     });
}); 


/* API : GetReportList */ 
app.get('/reportList', (req,res) => {
    fs.readdir("uploads", function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        res.json({"report_list": files }); 
    });
}); 

/* API : FileUPload */ 
app.post('/upload', upload.single('xml'), (req, res) => {
    console.log(req.file); 

    if (req.file){
        const dataXml = fs.readFileSync(`uploads/${req.file.filename}`).toString(); 
        parser.parseString(dataXml, function(error, result) {
            if(error === null) {
                let out_arr = []; 
                let vehicles = result.vehicles.vehicle;

                vehicles.forEach(element => {
                    let v_id        = element['id'][0]; 
                    let v_frame     = element['frame'][0]['material'][0]; 
                    let wheels      = element['wheels'][0]['wheel']; 
                    wheels = wheels.map((val) => {
                        return {"position" : val.position[0], 
                                "material" : val.material[0]
                        }; 
                    }); 
                    let powertrain  = element['powertrain'][0];  

                    let dict = {
                        "vehicle_id" : v_id.split(' ')[1], 
                        "vehicle_name" : predictName(powertrain,wheels,v_frame),
                        "frame_material" : v_frame, 
                        "wheels" : wheels, 
                        "powertrain" : powertrain, 
                        "fileName" : req.file.filename, 
                        "timestamp" : req.file.filename.split('-')[0], 
                    }
                    
                    let vehicleObj = new Vehicle(dict); 

                    vehicleObj.save((err)=>{});
                    out_arr.push(dict); 
                });  

                res.json({"report_data" : out_arr}); 
            }
        });
    }
    else
        res.status("409").json("No Files to Upload.");
});

/* LISTEN ON PORT */ 
app.listen(PORT);
