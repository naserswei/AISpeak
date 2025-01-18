const users = [
  {
    username: "alice_wonder",
    email: "alice@example.com",
    password: "password123",
  },
  {
    username: "bob_builder",
    email: "bob@example.com",
    password: "builder2023",
  },
  {
    username: "charlie_brown",
    email: "charlie@example.com",
    password: "securePass456",
  },
];

function getUser(value: string) {
  // Loop through each user in the `users` object
  for (const user of users) {
    // Check if the value matches the email or username
    if (user.email === value || user.username === value) {
      return user; // Return the matched user
    }
  }
  throw new Error("User does not exist");
}

export function login(value: string, password: string) {
  try {
    const { password: pass, ...other } = getUser(value);

    // Check if the provided password matches the user's password
    if (pass === password) {
      return { success: true, message: "Login successful", other };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    // Check if username or email already exists
    const usernameExists = users.some((user) => user.username === username);
    const emailExists = users.some((user) => user.email === email);

    if (usernameExists) {
      return { success: false, message: "Username already exists" };
    }

    if (emailExists) {
      return { success: false, message: "Email already exists" };
    }

    // Add the new user to the `users` array
    const newUser = { username, email, password };
    users.push(newUser);

    return { success: true, message: "User registered successfully", newUser };
  } catch (error) {
    return { success: false, message: "An error occurred during registration" };
  }
}
