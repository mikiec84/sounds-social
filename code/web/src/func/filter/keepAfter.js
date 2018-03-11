export const keepAfter = compare => collection =>
  collection.reduce(
    (acc, item) => {
      if (compare(item)) {
        return {
          hasFoundItem: true,
          items: [item]
        }
      }

      if (acc.hasFoundItem) {
        return {
          ...acc,
          items: [...acc.items, item]
        }
      }

      return acc
    },
    { hasFoundItem: false, items: [] }
  ).items
