export default function ({ allOf: values = null } = {}, actual) {
  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  if (!Array.isArray(actual)) throw new Error(`"${actual}" is not an array`)

  return values.every((item) => actual.includes(item))
}
