import bcrypt from 'bcryptjs';

export const loginHandler = async (username, password) => {
  try {
    bcrypt.hash('testuser@2021', 10, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Bcrypt hash:', hash);
    });
    const response = await fetch('usersData.json'); // Replace with the correct path to your JSON file
    const usersData = await response.json();

    const user = usersData.find((user) => user.email === username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Authenticated');
        return true;
      }
    }
    console.log('Authentication Failed');
    return false;
  } catch (error) {
    console.error('Error fetching users data:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
export const isTestCompleted = () => {
  return localStorage.getItem('isTestCompleted') === 'true';
};

export const signupHandler = async (username, password) => {
  try {
    const response = await fetch('usersData.json'); // Replace with the correct path to your JSON file
    const usersData = await response.json();

    const userExists = usersData.some((user) => user.email === username);
    if (userExists) {
      console.log('User already exists');
      return false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email: username, password: hashedPassword };

    usersData.push(newUser);
    // Note: This approach won't actually save the data back to the file since the frontend can't write to the filesystem.

    console.log('User signed up successfully');
    return true;
  } catch (error) {
    console.error('Error signing up:', error);
    return false;
  }
};
