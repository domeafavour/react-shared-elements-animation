import { PatternParams } from './typings';

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

/**
 * @deprecated
 */
export function isParamsMatched<S extends string>(
  pattern: S,
  sharedId: string,
  params?: Partial<PatternParams<S>>
) {
  if (!isPatternMatched(pattern, sharedId) || !params) {
    return pattern === sharedId;
  }

  const parts = pattern.split('/');
  const idParts = sharedId.split('/');
  return parts.every((part, index) => {
    if (isVariable(part)) {
      return (
        params[getVariableName<keyof typeof params & string>(part)] ===
        idParts[index]
      );
    }
    return true;
  });
}

export function getMatchedParams<S extends string>(
  pattern: S,
  sharedId: string
): Partial<PatternParams<S>> {
  if (!isPatternMatched(pattern, sharedId)) {
    return {};
  }

  const params: Record<string, string> = {};
  const parts = pattern.split('/');
  const idParts = sharedId.split('/');
  parts.forEach((part, index) => {
    if (isVariable(part)) {
      params[getVariableName(part)] = idParts[index];
    }
  });

  return params as PatternParams<S>;
}

export function generateFromPattern<S extends string>(
  pattern: S,
  params?: PatternParams<S>
) {
  if (!pattern.includes('/') || !params) {
    return pattern;
  }
  const parts = pattern.split('/');
  return parts
    .map((part) =>
      isVariable(part)
        ? params[getVariableName<keyof typeof params & string>(part)]
        : part
    )
    .join('/');
}

export function createSharedIdPattern<P extends object = object>(
  pattern: string
) {
  /** @deprecated */
  function match(sharedId: string, params?: Partial<P>) {
    return isParamsMatched(pattern, sharedId, params);
  }

  function matchParams(sharedId: string) {
    return getMatchedParams(pattern, sharedId) as Partial<P>;
  }

  function isMatched(sharedId: string) {
    return isPatternMatched(pattern, sharedId);
  }

  function generate(params: P) {
    return generateFromPattern(pattern, params);
  }

  return { match, matchParams, isMatched, generate };
}
