export class CustomRegex {
  static password = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}$';
  static onlyText = '^[a-zA-Z]*$';
  static username = '^[a-zA-Z ]*$';
  static email = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  static updateEmail = '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}(\\.[0-9]{1,3}){3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  static pincode = '^[1-9][0-9]{5}$';
}

export class ValidationMessages {
  static password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
  static onlyText = 'Only alphabetic characters are allowed.';
  static username = 'Username can only contain letters and spaces.';
  static email = 'Please enter a valid email address.';
  static updateEmail = 'Enter a valid email format.';
  static pincode = 'Pincode must be a 6-digit number starting from 1-9.';
}