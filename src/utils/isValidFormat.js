const isValidFormatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  // Check if the cleaned phone number has at least 10 digits
  if (cleanedPhoneNumber.length < 10) {
    return false;
  }
  // Define a regular expression for valid phone number format
  const phoneNumberRegex = /^\d{10,15}$/; // You can adjust the upper limit (15) based on your needs
  // Test if the cleaned phone number matches the regular expression
  return phoneNumberRegex.test(cleanedPhoneNumber);
}
const isValidFormatEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

module.exports = { isValidFormatPhoneNumber, isValidFormatEmail }