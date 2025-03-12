# Rentals
api/rentals

## New Rental
**POST api/rentals**
Creates new rental document
### Request Body
- `customerId` (string, requires) - the **mongoose objectId** of customer making rental.
- `movieId` (string, requires) - the **mongoose objectId** of movie being rented.
- `rentalDate` (string, requires) - A valid date string. If omitted, it will be set automatically at the time of the request.
### Request Example
``` json
{
  "customerId": "65d9a1b4c3d8e71234d56788",
  "movieId": "65d9b2c6e7f8e71234d56787"
}
```

### Response
``` json
{
	"customer": {
		"customerId": "67c5b792577a65810acaa472",
		"name": "yoir chalk",
		"isGold": true,
		"phone": "1234567890",
		"_id": "67cf5ffe0a433b940f34fefc"
	},
	"movie": {
		"movieId": "67cde6841dd58eaa738d171a",
		"name": "34567",
		"dailyRentalRate": 9.5,
		"_id": "67cf5ffe0a433b940f34fefd"
	},
	"rentalDate": "2025-03-10T21:15:11.642Z",
	"_id": "67cf5ffe0a433b940f34fefb",
	"__v": 0
}
```


## Return Rental
**POST api/rentals/:id**
Marks rental as returned
### URL Parameters
- `:id` (string, required) - the **mongoose objectId** of the rental being returned
### Request Example
``` http
PATCH /api/rentals/65d9c3f2a5b8e71234d56789 HTTP/1.1
```
    
### Response 