export function transliterate(text: string): string[] {
  if (!text) return []
  
  const variants = new Set<string>()
  const lowerText = text.toLowerCase().trim()
  variants.add(lowerText)

  // Normalize apostrophes for Latin
  const normalized = lowerText
    .replace(/[‘’`‘]/g, "'")
  
  variants.add(normalized)
  variants.add(normalized.replace(/'/g, "")) // Variant without any apostrophes

  const lat2cyr: Record<string, string> = {
    'sh': 'ш', 'ch': 'ч', 'o\'': 'ў', 'g\'': 'ғ', 'yu': 'ю', 'ya': 'я', 'yo': 'ё', 'ng': 'нг',
    'shch': 'щ', 'ts': 'ц', 'ye': 'е',
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'j': 'ж', 'z': 'з', 'i': 'и',
    'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с',
    't': 'т', 'u': 'у', 'f': 'ф', 'x': 'х', 'h': 'ҳ', 'q': 'қ'
  }

  const cyr2lat: Record<string, string> = {
    'ш': 'sh', 'ч': 'ch', 'ў': 'o\'', 'ғ': 'g\'', 'ю': 'yu', 'я': 'ya', 'ё': 'yo', 'нг': 'ng',
    'щ': 'shch', 'ц': 'ts', 'е': 'e', 'э': 'e',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ж': 'j', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
    'т': 't', 'у': 'u', 'ф': 'f', 'х': 'x', 'ҳ': 'h', 'қ': 'q', 'ь': '', 'ъ': ''
  }

  // Multi-character Latin to Cyrillic
  let toCyr = normalized
  const multiLatKeys = ['shch', 'sh', 'ch', 'o\'', 'g\'', 'yu', 'ya', 'yo', 'ng', 'ts', 'ye']
  for (const key of multiLatKeys) {
    if (toCyr.includes(key)) {
      toCyr = toCyr.split(key).join(lat2cyr[key])
    }
  }
  // Single char Latin to Cyrillic
  for (const char of toCyr) {
    if (lat2cyr[char]) {
      toCyr = toCyr.split(char).join(lat2cyr[char])
    }
  }
  variants.add(toCyr)

  // Cyrillic to Latin
  let toLat = normalized
  const multiCyrKeys = ['ш', 'ч', 'ў', 'ғ', 'ю', 'я', 'ё', 'нг', 'щ', 'ц']
  for (const key of multiCyrKeys) {
    if (toLat.includes(key)) {
      toLat = toLat.split(key).join(cyr2lat[key])
    }
  }
  // Single char Cyrillic to Latin
  for (const char of toLat) {
    if (cyr2lat[char]) {
      toLat = toLat.split(char).join(cyr2lat[char])
    }
  }
  variants.add(toLat)
  
  // Also add variant without apostrophes for the transliterated Latin
  variants.add(toLat.replace(/'/g, ""))

  return Array.from(variants)
}
