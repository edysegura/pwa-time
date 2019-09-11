class App {

  data = [
    { elementId: 'together', startDate: '20040322' },
    { elementId: 'married', startDate: '20040322' },
    { elementId: 'son-age', startDate: '20180311' }
  ]

  constructor() {
    this.calculate()
  }

  calculate() {
    this.data.forEach(this.howLongFromNow)
  }

  howLongFromNow(item) {
    const element = document.getElementById(item.elementId)
    const removeSufix = true
    element.textContent = moment(item.startDate).fromNow(removeSufix)
  }
}

new App()