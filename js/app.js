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
    if ('serviceWorker' in navigator) {
      console.log('Installing cache...')

      const success = () => console.log('Cache has been installed')
      const failure = error => console.log('Cache installation failed', error)

      navigator.serviceWorker
        .register('./cache.js')
        .then(success)
        .catch(failure)
    }
  }

  howLongFromNow(item) {
    const element = document.getElementById(item.elementId)
    const removeSufix = true
    element.textContent = moment(item.startDate).fromNow(removeSufix)
  }
}

new App()