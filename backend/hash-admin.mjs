import bcrypt from "bcryptjs";

const password = "admin123";

bcrypt.hash(password, 10).then(hash => {
  console.log("Hash pour admin123 :", hash);
});
