export function createColorModeSemanticToken(
  name: string,
  lightPallete: string,
  darkPallete: string
) {
  const semanticTokens: Record<
    string,
    {
      default: string;
      _light: string;
      _dark: string;
    }
  > = {
    [name]: {
      default: `${lightPallete}`,
      _light: `${lightPallete}`,
      _dark: `${darkPallete}`,
    },
    [name + ".50"]: {
      default: `${lightPallete}.50`,
      _light: `${lightPallete}.50`,
      _dark: `${darkPallete}.50`,
    },
  };

  for (let i = 100; i <= 900; i += 100) {
    semanticTokens[name + "." + i] = {
      default: `${lightPallete}.${i}`,
      _light: `${lightPallete}.${i}`,
      _dark: `${darkPallete}.${i}`,
    };
  }

  return semanticTokens;
}
