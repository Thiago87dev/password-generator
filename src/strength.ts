export default function strengthFunc(qnt: number, qntSelect: number) {
  if (qntSelect === 0 || qnt === 0) return "";
  if (qnt < 8) return "Too Weak";
  if (qnt >= 8 && qnt < 12 && qntSelect <= 2) return "Too Weak";
  if (qnt >= 8 && qnt < 12 && qntSelect >= 3) return "Weak";
  if (qnt >= 12 &&  qnt < 18 && qntSelect <= 2) return "Weak";
  if (qnt >= 12 && qnt < 15 && qntSelect === 3) return "Medium";
  if (qnt >= 12 && qntSelect === 1) return "Medium";
  if (qnt >= 12 && qntSelect === 4) return "Strong";
  if (qnt >= 15 && qntSelect < 4) return "Medium";
  if (qnt >= 18 && qntSelect >= 2 && qntSelect <= 4) return "Medium";

  return "Something went wrong";
}
