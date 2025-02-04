# Number Classification API

# Overview
The Number Classification API accepts a number as input and returns various mathematical properties of the number along with a fun fact retrieved from the Numbers API.

# Features
- Determines whether the number is prime.
- Checks if the number is a perfect number.
- Identifies if the number is an Armstrong number.
- Classifies the number as odd or even.
- Calculates the sum of the digits of the number.
- Fetches a fun fact about the number from the Numbers API.

# API Endpoint
 GET /api/classify-number?number={number}

# Request Parameters
number (integer): The number to be classified.

# Response (200 OK)
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

# Response (400 Bad Request)
```json
{
    "number": "alphabet",
    "error": true
}
```

# Technologies Used
- Node.js
- Express.js
- Axios (for fetching fun facts)
- Deployed on a publicly accessible server

# Installation & Setup
1. Clone the repository:
   git clone https://github.com/Oluwaseunoa/number-classification-api.git

2. Navigate to the project directory:
   cd number-classification-api

3. Install dependencies:
   npm install

4. Start the server:
   npm start


# Deployment
Ensure the API is deployed on a publicly accessible platform such as Heroku, Vercel, or AWS.

# Contribution
Feel free to submit issues or pull requests to improve the API!

# License
This project is open-source and available under the MIT License.

