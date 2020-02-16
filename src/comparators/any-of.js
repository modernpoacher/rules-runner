export default function ({ anyOf: values = null } = {}, actual) {
  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  return values.includes(actual)
}
