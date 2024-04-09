const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
const generateUppercase = () => String.fromCharCode(rand(65, 91));
const generateLowercase = () => String.fromCharCode(rand(97, 123));
const generateNumber = () => String.fromCharCode(rand(48, 58));
const symbols = "!@#$%&*()_-+?/|[]{}.'~^:;,<>=";
const generateSymbol = () => symbols[rand(0, symbols.length)];

export default function passwordGenerator(
  qnt: number,
  upper: boolean,
  lower: boolean,
  num: boolean,
  symb: boolean
) {
  const senhaArray = []
  const functions = []

  upper && functions.push(generateUppercase);
    lower && functions.push(generateLowercase);
    num && functions.push(generateNumber);
    symb && functions.push(generateSymbol);

    functions.sort(() => 0.5 - Math.random())

  for (let i = 0; i < qnt; i++) {
    for (const func of functions) {
        senhaArray.push(func())
    }
  }

  senhaArray.slice(0, qnt);

  if (qnt === 0) return "Quantidade não pode ser igual a zero";
  return (
    senhaArray
      .slice(0, qnt)
      .sort(() => 0.5 - Math.random())
      .join("") || "Nada selecionado"
  );
}
