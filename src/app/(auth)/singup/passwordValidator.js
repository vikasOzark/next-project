/**
 * This utility function valiadates the password provided by the user and sets the security level in state function.
 * @param {String} password Accepts the users input raw password to validate if user's provided password is secure or not
 * @param {Function} setFunction setter function to update the password level
 */
const passwdValidator = (password, setFunction) => {
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const startsWithCapital = /^[A-Z]/.test(password);
  console.log(hasNumber && hasSpecial && startsWithCapital);

  if (password.length > 5) {
    if (hasNumber && hasSpecial && startsWithCapital) {
      setFunction("Very Strong");
    } else if (password.length > 7 && hasNumber) {
      setFunction("Strong");
    } else if (password.length > 5 && startsWithCapital) {
      setFunction("Medium");
    } else {
      setFunction("Weak");
    }
  } else {
    setFunction("Weak");
  }
};

export default passwdValidator;
