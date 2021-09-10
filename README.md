# A simple Cache system made using Redis.

## Overview

In this application, I have created two Express routes to get the list of users by making
an API call to a dummy data provider API.

The first route is **/users**: This always makes an API call to the service provider.
The second route is **/cached-users**: This makes an API call and stores the received
data in Redis under the key **users** and the cache is valid for 60 seconds. Now, whenever we go to the route **/cached-users**, if the data is present in the cache, then it is served from the cache directly. The data is evicted after 60 seconds.

There is drastic difference in the response time of these two routes!!

![Screenshot 2021-09-10 at 11 36 27 AM](https://user-images.githubusercontent.com/86518676/132807706-ad25d82e-ce6a-4339-8833-6cd9f512c510.png)


![Screenshot 2021-09-10 at 11 37 00 AM](https://user-images.githubusercontent.com/86518676/132807729-fbe90a81-524d-41bd-9130-21c304b4bf91.png)

## Learning Outcomes
Cache is Important!!
Cache eviction is crucial as well.
