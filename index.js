import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is a perfect number
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num && num !== 1;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    let sum = 0;
    let digits = num.toString().split("").map(Number);
    let power = digits.length;
    digits.forEach(digit => {
        sum += Math.pow(digit, power);
    });
    return sum === num;
};

// Function to classify the number
const classifyNumber = async (num) => {
    let properties = [];
    let digitSum = num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);

    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    let funFact = "No fun fact available";
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        funFact = response.data.text;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
    }

    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum,
        fun_fact: funFact
    };
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    let { number } = req.query;
    let num = parseInt(number);

    if (isNaN(num)) {
        return res.status(400).json({ number, error: true });
    }

    let result = await classifyNumber(num);
    res.json(result);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
