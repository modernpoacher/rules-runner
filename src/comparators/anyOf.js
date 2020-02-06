export default function ({ anyOf } = {}, actual) {
  if (Array.isArray(anyOf)) return anyOf.includes(actual)

  throw new Error(`"${anyOf}" is not an array`)
}
