// Expresión regular que captura la primera letra (incluye soporte para UTF-8/letras acentuadas)
export const regexPrimeraLetra = /^[^\p{L}]*(?<inicial>\p{L})/u;