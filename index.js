import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();
const PORT = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // Cache results for an hour

app.use(cors());

// Check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    if (num % 2 === 0 && num !== 2) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
};

// Check if a number is perfect
const isPerfect = (num) => {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i + (num / i !== i ? num / i : 0);
            if (sum > num) return false;
        }
    }
    return sum === num;
};

// Check if a number is an Armstrong number
const isArmstrong = (num) => {
    let sum = 0;
    let strNum = num.toString();
    let power = strNum.length;
    for (let i = 0; i < power; i++) {
        sum += Math.pow(parseInt(strNum[i]), power);
    }
    return sum === num;
};

// Fetch a fun fact with caching
const getFunFact = async (num) => {
    const cachedFact = cache.get(num);
    if (cachedFact) return cachedFact;

    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`, { timeout: 300 });
        cache.set(num, response.data.text);
        return response.data.text;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
        return "No fun fact available";
    }
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    let { number } = req.query;
    let num = parseInt(number);

    if (isNaN(num)) {
        return res.status(400).json({ number, error: true });
    }

    // Compute properties in parallel
    const [prime, perfect, armstrong, funFact] = await Promise.all([
        isPrime(num),
        isPerfect(num),
        isArmstrong(num),
        getFunFact(num),
    ]);

    let properties = [];
    if (armstrong) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    res.json({
        number: num,
        is_prime: prime,
        is_perfect: perfect,
        properties,
        digit_sum: num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0),
        fun_fact: funFact,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
