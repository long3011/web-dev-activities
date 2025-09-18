const jwt = require('jsonwebtoken');

// Function to create and sign a JWT
function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };
  const secretKey = 'yourSecretKey'; // Replace with your secret key

  // Sign the JWT with the payload and secret key
  const token = jwt.sign(payload, secretKey);

  console.log('JWT Token:', token);
}

// Function to verify a JWT
function verifyJWT(token) {
  const secretKey = 'yourSecretKey'; // Replace with your secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
    } else {
      console.log('JWT Verified. Decoded:', decoded);
    }
  });
}

// Function to decode a JWT
function decodeJWT(token) {
  const decoded = jwt.decode(token);

  console.log('Decoded JWT:', decoded);
}


// Call the function to create and sign a JWT
createJWT();

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtTokenToVerify = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJleGFtcGxlVXNlciIsImlhdCI6MTc1ODA5MDk4OH0.uHKvUluottjU8kvXPfYZcZYAz6UFUot2Q-';
// Call the function to verify the JWT
verifyJWT(jwtTokenToVerify);

// Replace 'yourTokenHere' with a JWT token you generated in Step 4
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJleGFtcGxlVXNlciIsImlhdCI6MTc1ODA5MDk4OH0.uHKvUluottjU8kvXPfYZcZYAz6UFUot2Q-';
// Call the function to decode the JWT
decodeJWT(jwtToken);