# Steps Tracking Api
This is a WebSocket-based API in which the client can send a series of updates with the number of steps that were recently taken. Whenever the server receives a valid update, the user's step count should be updated to reflect the total number of steps taken up until that point in time. A valid update is a WebSocket message containing a JSON payload that has a newSteps (Number) recently taken and a startDate (ISO date formate,  ex: "2022-11-05T14:02:12.690Z") 

## Setup Locally
1. Clone stepstrackingapi from https://github.com/meghna512/stepstrackingapi.git
2. Go to terminal inside certificategenerationapi directory and run npm install
3. Create a .env file, similar to .env.example
4. Run npm run start command.

Please use ws://localhost:3000/?userId=<user-id> as socket url for testing purpose.
