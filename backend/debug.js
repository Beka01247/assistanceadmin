const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "root";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
}

hashPassword();
