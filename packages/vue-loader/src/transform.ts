const setupFunctionRE = /function setup\([\s\S]+\)\s+?\{[\s\S]+return __returned__\n\}/;

export function transferSetupPosition(content: string) {
  const match = content.match(setupFunctionRE);

  if (match) {
    const setupFunction = match[0];

    return content
      .replace(setupFunction, "")
      .replace("setup})", `${setupFunction.slice("function ".length)}\n\r})`);
  }

  return content;
}
