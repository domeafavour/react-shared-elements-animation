function isVariable(part: string) {
  return part.startsWith(':');
}

function getVariableName<T extends string = string>(part: string): T {
  return part.replace(/^:/, '') as T;
}

export function isPatternMatched<S extends string>(
  pattern: S,
  sharedId: string
) {
  const parts = pattern.split('/');
  const idParts = sharedId.split('/');
  return (
    parts.length === idParts.length &&
    parts.every((part, index) => isVariable(part) || part === idParts[index])
  );
}

export function createSharedIdPattern<P extends object = object>(
  pattern: string
) {
  function match(sharedId: string, params?: Partial<P>) {
    if (!pattern.includes('/') || !params) {
      return pattern === sharedId;
    }
    const parts = pattern.split('/');
    const idParts = sharedId.split('/');
    if (parts.length !== idParts.length) {
      return false;
    }
    return parts.every((part, index) => {
      return isVariable(part)
        ? params[getVariableName<keyof P & string>(part)] === idParts[index]
        : part === idParts[index];
    });
  }

  function matchParams(sharedId: string) {
    const params: Record<string, any> = {};
    if (!pattern.includes('/')) {
      return params;
    }
    const parts = pattern.split('/');
    const idParts = sharedId.split('/');
    parts.forEach((part, index) => {
      if (isVariable(part)) {
        params[getVariableName<keyof P & string>(part)] = idParts[index];
      }
    });
    return params as Partial<P>;
  }

  function isMatched(sharedId: string) {
    return isPatternMatched(pattern, sharedId);
  }

  function generate(params: P) {
    if (!pattern.includes('/')) {
      return pattern;
    }
    const parts = pattern.split('/');
    return parts
      .map((part) =>
        isVariable(part)
          ? params[getVariableName<keyof P & string>(part)]
          : part
      )
      .join('/');
  }

  return { match, matchParams, isMatched, generate };
}
