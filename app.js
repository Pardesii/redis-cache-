const redis = require('redis');
const client = redis.createClient();
const express = require('express');
const axios = require('axios');

const app = express();

client.on('connect', function () {
    console.log('connected');
})

const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

// two routes one cached and one non-cached

app.get('/users', (req, res) => {

    axios.get(`${USERS_API}`)
        .then((response) => {
            const data = response.data;
            console.log("Received the data");
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ error: err });
        })

})


app.get('/cached-users', (req, res) => {

    client.get('users', (err, ans) => {
        if (err) res.status(500).send({ error: err });
        if (ans) {
            console.log("Got data from cache.");
            res.status(200).send(ans);
        }
        else {
            axios.get(`${USERS_API}`)
                .then((response) => {
                    const data = response.data;
                    console.log("Received the data");
                    client.setex('users',60,JSON.stringify(data));
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({ error: err });
                })
        }
    })

})

app.listen(3000, () => {
    console.log("Server is listening..");
})



