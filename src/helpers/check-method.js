const methods = [
  "get", "put", "post", "delete", "options", "head", "patch", "trace", "req", "sub"
]

function extractMethod(pathMethod) {
  const [_, method] = pathMethod;
  if (method !== undefined && methods.includes(method))
    return method;
  else
    return pathMethod;
}

/**
 * Check method is one of event types
 *
 * @param {object} pathMethod Method type
 * @return {boolean} Method is on of event types
 */
export function isEventMethod(pathMethod) {
  switch (extractMethod(pathMethod)) {
    case 'sub':
    case 'req':
      return true;
    default:
      return false;
  }
}

/**
 * Check method is sub
 *
 * @param {object} pathMethod Method type
 * @return {boolean} Method is sub
 */
export function isSubMethod(pathMethod) {
  return extractMethod(pathMethod) === 'sub';
}

/**
 * Check method is pub
 *
 * @param {object} pathMethod Method type
 * @return {boolean} Method is pub
 */
export function isPubMethod(pathMethod) {
  return extractMethod(pathMethod) === 'pub';
}

/**
 * Map response code to event response code if needed
 *
 * @param {object} pathMethod Method type
 * @param {string} code Response code
 * @return {string} Code
 */
export function mapResponseToEvent(pathMethod, code) {
  if (isEventMethod(pathMethod)) {
    switch (code) {
      case '200':
      case 'default':
        return 'OK';
      default:
        return 'ERR';
    }
  }
  return code;
}
