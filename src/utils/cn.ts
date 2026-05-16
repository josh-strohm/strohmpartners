type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls && cls !== 0) continue;

    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls));
    } else if (Array.isArray(cls)) {
      const joined = cn(...cls);
      if (joined) result.push(joined);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}