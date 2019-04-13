const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://lvilelas:l.vilelas97756@cluster0-d8xst.azure.mongodb.net/test?retryWrites=true', 
    {
    useNewUrlParser: true,
    }
);

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/files', express.static(path.resolve(__dirname, '..','tmp')));

app.use(require('./routes'));


app.listen(process.env.PORT || 3333);
