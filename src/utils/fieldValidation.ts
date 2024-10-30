export const emailValidation = (email: string) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (regex.test(email) === false) {
    return true
  } else {
    return false
  }
}

export const extractNumbers = (string: string) => {
  if (string === '' || string === null || !string)
    return;

  var numeros = string.match(/\d/g);

  if (numeros)
    return numeros.join("");
  else
    return null;
}
