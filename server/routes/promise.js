// var Promise = require("bluebird")


function dbCall() {
 return new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('hello')
	}, 100)
})
}

dbCall().then((val) => {
	var value = val
	console.log('value : ', value)
})