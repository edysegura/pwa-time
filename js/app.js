class App {

  constructor() {
    this.calculate()
  }

  calculate() {
    const togetherElement = document.getElementById('together')
    const marriedElement = document.getElementById('married')
    const sonAgeElement = document.getElementById('son-age')
    const removeSufix = true

    togetherElement.textContent = moment('20040322').fromNow(removeSufix)
    marriedElement.textContent = moment('20080612').fromNow(removeSufix)
    sonAgeElement.textContent = moment('20180311').fromNow(removeSufix)

  }
}

new App()