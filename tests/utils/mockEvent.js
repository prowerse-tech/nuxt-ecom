export function createMockEvent(method, body = {}, params = {}) {
  return {
    req: { method },
    context: { params },
    body,
    _readBody: body,
  }
}

export async function readBody(event) {
  return event._readBody
}

export function createError({ statusCode, statusMessage }) {
  return { statusCode, statusMessage }
}

export function sendError(event, error) {
  return error
}
