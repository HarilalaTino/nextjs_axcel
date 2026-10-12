export function removeSpaces(value: string): string {
  return value.replace(/\s+/g, '');
}

export function formaterNombre(number: number): string {
  return number.toLocaleString('fr-FR');
}