import * as Yup from "yup";

const mixed = {
  default: "${path} é inválido.",
  required: "${path} é um campo obrigatório",
  oneOf: "${path} deve ser um dos seguintes valores: ${values}",
  notOneOf: "${path} não deve ser um dos seguintes valores: ${values}",
  notType: ({
    path,
    type,
    value,
    originalValue,
  }: {
    path: string;
    type: string;
    value: string;
    originalValue: string;
  }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `${path} deve ser um tipo de \`${type}\`, ` +
      `Mas o valor final foi: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (Elenco do valor \`${printValue(originalValue, true)}\`).`
        : ".");

    if (value === null) {
      msg +=
        `\n Se "null" pretender como um valor vazio, certifique-se de marcar o esquema como` +
        " `.nullable()`";
    }

    return msg;
  },
};

const string = {
  length: "${path} deve ter exatamente ${length} caracteres",
  min: "${path} deve ter pelo menos ${min} caracteres",
  max: "${path} deve ter no máximo ${max} caracteres",
  matches: '${path} deve corresponder ao seguinte: "${regex}"',
  email: "Campo ${path} deve conter um e-mail válido",
  url: "${path} deve ser um URL válido",
  trim: "${path} deve ser uma corda aparada",
  lowercase: "${path} deve ser minúscula",
  uppercase: "${path} deve ser maiúscula",
};

const number = {
  min: "${path} deve ser maior ou igual a ${min}",
  max: "${path} deve ser menor ou igual a ${max}",
  lessThan: "${path} deve ser menor que ${less}",
  moreThan: "${path} deve ser maior que ${more}",
  positive: "${path} deve ser um número positivo",
  negative: "${path} deve ser um número negativo",
  integer: "${path} deve ser um inteiro",
};

const date = {
  min: "Campo ${path} deve ser mais tarde do que ${min}",
  max: "${path} deve ser mais cedo do que ${max}",
};

const boolean = {};

const object = {
  noUnknown:
    "Campo ${path} não pode ter chaves não especificadas na forma do objeto",
};

const array = {
  min: "O campo ${path} deve ter pelo menos ${min} itens",
  max: "O campo ${path} deve ter menos ou igual a itens ${max}",
};
Yup.setLocale({
  mixed,
  string,
  array,
  object,
  boolean,
  date,
  number,
});

export { Yup };

// UTIL FROM LIB
const toString = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString =
  typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";

const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

function printNumber(val: number) {
  if (val !== +val) return "NaN";
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? "-0" : "" + val;
}

function printSimpleValue(val: any, quoteStrings = false) {
  if (val === null || val === true || val === false) return "" + val;

  const typeOf = typeof val;
  if (typeOf === "number") return printNumber(val);
  if (typeOf === "string") return quoteStrings ? `"${val}"` : val;
  if (typeOf === "function")
    return "[Function " + (val.name || "anonymous") + "]";
  if (typeOf === "symbol")
    return symbolToString.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");

  const tag = toString.call(val).slice(8, -1);
  if (tag === "Date")
    return isNaN(val.getTime()) ? "" + val : val.toISOString(val);
  if (tag === "Error" || val instanceof Error)
    return "[" + errorToString.call(val) + "]";
  if (tag === "RegExp") return regExpToString.call(val);

  return null;
}

export default function printValue(value: string, quoteStrings: boolean) {
  const result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;

  return JSON.stringify(
    value,
    function (key, value) {
      const result = printSimpleValue(this[key], quoteStrings);
      if (result !== null) return result;
      return value;
    },
    2
  );
}
