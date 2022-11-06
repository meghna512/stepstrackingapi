# Steps Tracking Api
This is a WebSocket-based API in which the client can send a series of updates with the number of steps that were recently taken. Whenever the server receives a valid update, the user's step count is updated to reflect the total number of steps taken until that time. A valid update is a WebSocket message containing a JSON payload that has a steps (Number) recently taken and a startDate (ISO date formate,  ex: "2022-11-05T14:02:12.690Z"). The client will access the WebSocket server by opening a connection to ws://localhost:3000/?userId= < user-id >. Here's an example of an update that your server needs to handle: { "steps": "1000", "startDate": "2022-11-05T14:02:12.690Z" }. Also for login- url: localhost:3000/user/login , payload: {"phoneNumber": "123456789"}
Signup- url: localhost:3000/user/signup , payload: {"userName": "meghna","phoneNumber": 7021772892,
"password": "passowrd"}
Get Steps- url: localhost:3000/steps/getSteps/789

For reference checkout postman collections link at the bottom.

## Setup Locally
1. Clone stepstrackingapi from https://github.com/meghna512/stepstrackingapi.git
2. Go to terminal inside certificategenerationapi directory and run npm install
3. Create a .env file, similar to .env.example
4. Run npm run start command.

Please use ws://localhost:3000/?userId= < user-id > as socket url for testing purpose.
A link to Postman Collections is: https://www.getpostman.com/collections/721fd1ef7ccb0bea2ec1
