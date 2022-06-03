import * as path from 'node:path'
import * as os from 'node:os'

/**
 * Expands a path out using known unix shell shortcuts
 * ~ expands to your home directory
 * ~+ expands to your current directory
 *
 * @param filePath The filepath to expand out using unix shortcuts
 */
export const resolve = (filePath: string): string => {
  return path.resolve(expandTilde(filePath))
}

/**
 * Expands a path out using known unix shell shortcuts
 * ~ expands to your home directory
 * ~+ expands to your current directory
 *
 * @param filePath The filepath to expand out using unix shortcuts
 */
const expandTilde = (filePath: string): string => {
  const CHAR_TILDE = 126
  const CHAR_PLUS = 43
  const home = os.homedir()

  if (filePath.charCodeAt(0) === CHAR_TILDE) {
    if (filePath.charCodeAt(1) === CHAR_PLUS) {
      return path.join(process.cwd(), filePath.slice(2))
    }

    if (!home) {
      return filePath
    }

    return path.join(home, filePath.slice(1))
  }

  return filePath
}
