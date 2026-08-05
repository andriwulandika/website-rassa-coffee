/**
 * Supabase/PostgREST errors are plain objects with a `message` property,
 * not instances of the native Error class - so `error instanceof Error`
 * misses them and we'd fall back to a generic message. This checks both.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return fallback;
}
