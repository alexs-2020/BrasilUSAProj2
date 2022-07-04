const mongoose = require('mongoose')
const Location = require('./models/Location')

 mongoose.connect('mongodb+srv://Brasil:Usa2022@locations.hwccw.mongodb.net/Brasil_USA_Project_DATABASE?retryWrites=true&w=majority');



const locals = [
	{
		title: 'weiner',
        img: "public\images\monke.jpg",
        location: "joao mom house - torres rs"
    	},
]

Location.create(locals)
	.then(localsFromDB => {
		console.log(`${localsFromDB.length} celebrities got created`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))