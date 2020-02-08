const filterObj = {
  moneyFilter (value) {
    if (value) {
      return (parseFloat(value) / 100).toFixed(2)
    } else if (value === 0) {
      return 0
    } else {
      return ''
    }
  }
}

export default filterObj
