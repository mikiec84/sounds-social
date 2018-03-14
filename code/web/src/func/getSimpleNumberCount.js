const labels = {
  thousand: 'K',
  million: 'M'
}

const parseToInt = num => parseInt(num, 10)

export const getSimpleNumberCount = number => {
  if (number > 999999) return `${parseToInt(number / 1000000)}${labels.million}`
  if (number > 999) return `${parseToInt(number / 1000)}${labels.thousand}`

  return `${number}`
}
