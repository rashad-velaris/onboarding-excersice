export const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, (letter, index) => {
    if (index === 0) {
      return letter.toLowerCase();
    }
    if (str[index - 1] === '_' || /[a-z]/.test(str[index - 1])) {
      return `_${letter.toLowerCase()}`;
    }
    return letter.toLowerCase();
  });
};

/**
 * This function processes a template string and replaces placeholders with corresponding values from a replacements object.
 * Placeholders in the template string are denoted by a colon followed by the key name (e.g. :key).
 * If a key from the template string does not exist in the replacements object, it is replaced with a dash (-).
 *
 * @param {string} template - The template string containing placeholders.
 * @param {Object} replacements - An object containing key-value pairs for placeholder replacements.
 * @returns {string} - The processed string with placeholders replaced by corresponding values from the replacements object.
 */
export const processTemplate = (template, replacements) => {
  return template.replace(/:[a-zA-Z]+/g, (match) => {
    const key = match.slice(1);
    return Object.hasOwn(replacements, key) ? replacements[key] : '-';
  });
};
