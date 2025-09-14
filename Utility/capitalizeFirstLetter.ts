/**
 * Capitalizes the first letter of the given string and makes the rest lowercase.
 *
 * @param string - The input string to be transformed.
 * @returns The input string with the first letter capitalized and the rest in lowercase.
 */
export function capitalizeFirstLetter(string: string) {
  // Check if the string is empty
  if (string.length === 0) return string;

  // Capitalize the first letter and make the rest lowercase
  var capitalized =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  // Remove "_" and "-" characters and replace them with spaces
  capitalized = capitalized.replace(/[_-]/g, " ");

  return capitalized;
}
