/**
 * Takes an object and returns a FormData object with the same key-value pairs.
 * Supports nested objects and arrays of values.
 * @param {Object} values - The object to convert to FormData
 * @returns {FormData} - The generated FormData object
 */

export const generateFormData = <T extends Record<string, any>>(values: T) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    // This will handle Array
    if (Array.isArray(values[key])) {
      values[key].forEach((item) => formData.append(key, item));
    } else if (values[key] instanceof FileList) {
      // This will handle File input. First need to make array of the files from the filelist and then appending it to formdata
      Array.from(values[key]).forEach((item) => formData.append(key, item));
    } else if (values[key] instanceof Object) {
      // This will handle nested objects
      const nestedItem = values[key];
      Object.keys(nestedItem).map((nestedKey) => {
        formData.append(`${key}.${nestedKey}`, nestedItem[nestedKey]);
      });
    } else {
      formData.append(key, values[key]);
    }
  });

  return formData;
};
