import path from 'path'

export const joinCwd = (destination: string) => {
  return path.join(process.cwd(), destination)
}