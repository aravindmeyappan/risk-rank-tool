export const validatePlayerID = (value) => {
  const regex = /^[a-z]{3}\d{6}[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]{2}$/;

  // Check for no uppercase letters
  if (/[A-Z]/.test(value)) {
    return false;
  }

  // Check the format of the Player ID
  return regex.test(value);
};
