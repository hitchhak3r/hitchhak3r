const firebase = require('firebase-admin');
const chance = require('chance').Chance();

firebase.initializeApp({
    credential: firebase.credential.cert({
        "type": "service_account",
        "project_id": "hichhak3r",
        "private_key_id": "ea63387d69465800e313da639b02a63c012867e0",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcqcQPMOrCXKGm\nYQkGxQqskui3v90ryyPjZJKLDpQF2VnJ4EoI2IoW7E7Mj+Re2Gf5IIHPpTBg7qrM\nUFVSef9mwWGdzGN+xBDqfcZvUqHCpgbVhRaYP4sFpBYqI/ar2zQDUgqiBAY44dQ/\nMCqLzKBxLY6w5yHCPEz7UjiGJYGSxrD2X0TESy2ojZvjTBNog5ZM9yH4/DtuWfo6\n+JOKhG5iiS+PcXI2Pr0RKXN4gASrvz2sWpLrvDzCoZ8a/qHHAB3RQL+ruRz/3Nue\nSvJ++baRDdUlayQsdAIB5cl9vTKG5rVKyN9WB3XqMdE25ZoluQ2OljVL2Kvcf4bO\nOxIfwsbhAgMBAAECggEBAIZE7r3noBGgV+RrixiJcVNNGTomDyiEtVO6cMkYl81v\nUgla5vG3AV+tbs1eiTGFMM8QjqyQ8X0p/NfR0fkbruMRrJpeMfSCzWBCJCq89xz/\n9YybLQJ7N9a435vIwmIUQfP7SekH1dlq4MGKR3lFjCMR+499NLeCBb2vbCGEVPG/\nv8m0VaAo22PrMJYPyJTNhICgcFxzJ3gA+rqwh2r6hD5iCzZxE4MhzqLNonQB4/HN\nZl6t0Uo63t7ACo+AuHMu43mewMBfe50bG4urVflSIAURFmpUBzvLq1CNQprz+ejL\nwLALH2LfMP6nnwerOVqWh/ixr/3unYz6rHhHKOA7EyECgYEA8YCzRSfu9hUx4TPY\nBuWAO/IvjkOEokDuC5vvFWJa/8M9vInYMhpJXGsx2UWVv+vuuonly07IjKRM4dp0\nz34xg3MPE1UiI/cr6Dl4hkKkLMJRXhNTNq9quXTMXK+GaYgT7rqzf4M4xu2BFB5q\nlJjWmLFinwAvTpf/bW3n17G0on0CgYEA6ejQCtQ7r4BQaim338Atn7lBxhWB2DKK\no4BefMK1DNVby9B7LnDx/U7M53EKpjNR3ZyUv9uhs+8kKQouli9WoTHy5nDolB1H\n1Rajf3o0lZyoB0v06wmKz4CNQKMvrfbJx1jqMys9YjW7Fstny34r8brYmro9yc/7\ny41Q3wtwHzUCgYA9m/af6tsUXj3WVNKEl+HJ6TPmmCTq+6N+xK4Oh4PtgZJrWcMU\nrQ4QDKyv4Aee6YKChhFgd13EO1n9uCxajrf079JlvS8ze6fw21B6999IJ954IHf3\nGHMiksBb2M9ydquXGHwYSJKgdRCb4FKSTBda5s3hADwRUcdw1Dv0E7qgRQKBgG3N\n0aPTv3UCij1b+io6P/Cj+cFwJTUFfNmGEFUG3hD5M494/epuMNsVm9Dl2vbsTnj2\n4UkzZDRghZwSYI42CLfBB+KvjC7DlA3vA697AaZeFO7f9EhFgXkpQqXeNSq4GD7R\neZetq7InwPzRXZdEUoK2kKoJ1amgTfZfD2C1MNwlAoGASLbaEDy8RhCeDfQpECop\npdGCtU2wlUMM35dIeayRoSp/d6jBG9RABgwJKLcj+as/t/ne4i319AQqry/Ls4qv\nh4EckR4VXHuynHaJTx6E1wrhuEdviry5Yil/gVBFckPO+DzYA8fEe8xSOaj2rv2H\nfyg4zA65ZIQnPrP8BUq9STA=\n-----END PRIVATE KEY-----\n",
        "client_email": "seeder@hichhak3r.iam.gserviceaccount.com",
        "client_id": "107985171280592845658",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/seeder%40hichhak3r.iam.gserviceaccount.com"
    }),
    databaseURL: "https://hichhak3r.firebaseio.com/"
});

const database = firebase.database();

function pushErrorHandler(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Entity added");
    }
}

function addOffer(hitchikerPos, destName, destPos) {
    database.ref("/AvailableOffers").push({
        Destination: {
            Address: destName,
            GeoPosition: destPos,
        },
        HitchackerGeoPosition: hitchikerPos,
    }, pushErrorHandler);
}

function addPickupPointLocation(destName, destPos) {
    database.ref("PickupPointLocation").push({
        Address: destName,
        GeoPosition: destPos,
    }, pushErrorHandler);
}

function addTransit(driverPosition, pickupName, pickupPos, destName, destPos) {
    database.ref("Transit").push({
        DriverPosition: driverPosition,
        Destination: {
            Address: destName,
            GeoPosition: destPos
        },
        PickupPointLocation: {
            Address: pickupName,
            GeoPosition: pickupPos
        }
    }, pushErrorHandler);
}


for(let i = 0; i < 10; ++i) {
    addOffer(chance.coordinates(), chance.address(), chance.coordinates());
    addPickupPointLocation(chance.address(), chance.coordinates());
    addTransit(chance.coordinates(), chance.address(), chance.coordinates(), chance.address(), chance.coordinates());
}