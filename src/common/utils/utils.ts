export function sanitizeString(value: string) {
  if (!value) return;
  return value.replace(/\.|\-|\_|\)|\(|\/|\s/g, "");
}

export function getUniqueValues<T extends Record<string, any>>(
  values: T,
  defaultValues: T
) {
  const valuesObj = { ...values };
  const valuesKeys = Object.keys(values);

  for (const key of valuesKeys) {
    const newValue = valuesObj[key];
    const oldValue = defaultValues[key];

    if (newValue === oldValue) delete valuesObj[key];
  }
  return valuesObj;
}

export function isEmpty(obj: Record<string, any>) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export function objectToURLParams(obj: Record<string, any>) {
  return encodeURI(
    new URLSearchParams({
      ...obj,
    }).toString()
  );
}

export function reduceString(
  str: string,
  size = 25,
  obfuscationCharacter = "..."
) {
  if (!str) return null;
  if (str?.length <= size) return str;
  return str.slice(0, size - 3) + obfuscationCharacter;
}
