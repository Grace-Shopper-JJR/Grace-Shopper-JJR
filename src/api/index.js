export async function register(username, password) {
    try {
      const response = await fetch(`http://localhost:3000/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }