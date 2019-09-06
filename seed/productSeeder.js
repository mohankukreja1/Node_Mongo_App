var mongoose = require('mongoose');

var product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
        var items = [
            new product({
                imagePath: 'images/download.jpeg',
                title: 'Modern Warfare',
                description : 'First Player shooting game',
                price: 10
        
            }),
            new product({
                imagePath: 'images/mw2.jpeg',
                title: 'Modern Warfare 2',
                description : 'First Player shooting game',
                price: 12
        
            }),
        
        ];
        var done = 0;
        for(var i=0;i<items.length;i++){
            items[i].save(function(err,result){
                if(err) throw err;
                done++;
                console.log('svaed');
                if(done == items.length){
                    mongoose.disconnect();
                }
            })
        }
    }
},);


