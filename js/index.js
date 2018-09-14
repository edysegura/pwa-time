const togetherElement = document.getElementById('together')
const marriedElement = document.getElementById('married')
const removeSufix = true

togetherElement.textContent = moment('20040322').fromNow(removeSufix)
marriedElement.textContent = moment('20080612').fromNow(removeSufix)
