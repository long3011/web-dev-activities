const bcrypt = require('bcrypt');
// Function to hash a password
async function hashPassword() {
  const password = 'mySecurePassword'; // Replace with your password

  try {
    // Generate a salt with 10 rounds (you can adjust this number)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to compare a password with a hash
async function comparePassword() {
  const inputPassword = 'mySecurePassword'; // Replace with the password you want to compare
  const hashedPassword = '$2b$10$hgq8T7DA7N15cB9tn3Ze8u8D0jlCHuZ41CwxBsovcfCAY9Lgh74M2'; // Replace with the hashed password stored in your application

  try {
    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to compare the password
hashPassword();
comparePassword();