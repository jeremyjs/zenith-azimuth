
export const updateById = (ary, id, assignment) => (
  ary.map(
    (item) => (
      item.id === id ? Object.assign({}, item, assignment) : item
    )
  )
)
