class App {

  data = [
    { elementId: 'together', startDate: '20040322' },
    { elementId: 'married', startDate: '20080712' },
    { elementId: 'son-age', startDate: '20180311' }
  ]

  constructor() {
    this.calculate()
    this.installCache()
  }

  calculate() {
    this.data.forEach(this.howLongFromNow)
  }

  installCache() {
    console.log('Registy cache.js')
  }

  howLongFromNow(item) {
    const element = document.getElementById(item.elementId)
    const removeSufix = true
    element.textContent = moment(item.startDate).fromNow(removeSufix)
  }
}

new App()