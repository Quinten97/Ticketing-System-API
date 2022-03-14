# A simple ticketing REST API

Hey! thanks for checking out the project, I wrote this simple API with the intention of using it for my small computer repair business but figured that it may be of help to others if I uploaded it for use here on github.

This is my first time writing an API so feel free to leave any constructive critism on how I could improve.

## Use

I hope to have a video up soon to show how to implement this api locally for your private use, currently I am working on developing a frontend for it so it could be used locally. The goal of this project of course is to provide a free tool for small business owners.

## Endpoints

For those of you who want to use the API and develop your own front end I encourage you to clone this repository. Currently the functionality is very basic and limited and since this project use sqlite3 there are a few niche workarounds you may have to solve when building your own frontend.

For instance! sqlite doesnt work in dates, however it will sort dates correctly even if they are a string as long as they are in a consistent format. My workaround of course then being to limit the format of user input for that form field.

### GET

```
/tickets
```

This endpoint returns every ticket currently in the db.

```
/tickets/:string
```

This endpoint can return every ticket that meets the search criteria, you can pass in any string and it will check to see if any tickets have a matching entry on their first_name, last_name, email, phone_number, or employee column.

### POST

```
/tickets
```

You can post a new ticket to this endpoint and it will return a response with the ticket data.
heres an example of this endpoing using the Fetch api in js.

```
fetch('http://localhost:3000/tickets', {
method: 'POST',
body: newURLSearchParams({
    date: 7/22/45,
    firstName: jane,
    lastName: doe,
    email: jd@fake.net,
    phoneNumber: 2344323344,
    brandModel: dell inspiron,
    serial: 343errf,
    issue: broken display,
    notes: wanted to pay after repair,
    employee: james
    })
})
    .then(res => {
        //do stuff
    });
```

### PATCH

```
/tickets/:id
```

patching a ticket is a little more involed but not super far off from how we post. To patch you'll need to pass in the id of the ticket you wish to update into the url as well as pass some information into the body of the request.

```
fetch(`http://localhost:3000/tickets/${ticketID}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: newURLSearchParams({
        column: 'first_name',
        value: 'jane'
    })
})
    .then(res => {
        //do stuff
    });
```

The PATCH method is limited to updating one column at a time so it may be best to have an "update" button appear when a user is changing a given field.

### DELETE

```
/tickets/:id
```

The delete endpoint works much like our second GET method, simply pass in the id of the ticket you wish to delete from the db.

## Conclusion

I'd love to see what projects people might use this for so please feel free to share if you decide to make anything with this API. I still want to work on and improve it as much as I can to give people more tools to use so any recommendations and CC is more than welcomed.
