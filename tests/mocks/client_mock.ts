export const clientsList = {
	data: [
		{
			id: 1,
			name: "Jill Valentine",
			cpf: "01854825698",
			addresses: [
				{
					id: 1,
					street: "Rua Raccoon",
					number: "2809",
					neighborhood: "Umbrella Ville",
					city: "Raccoon City",
					state: "Kansas",
					country: "Estados Unidos",
					postalCode: "66101-66160"
				}
			],
			phones: [
				{
					id: 1,
					phone: "48996002809"
				}
			]
		},
		{
			id: 2,
			name: "Carlos Oliveira",
			cpf: "01889752419",
			addresses: [
				{
					id: 2,
					street: "Rua Raccoon 2",
					number: "2909",
					neighborhood: "Arklay Ville",
					city: "Raccoon City",
					state: "Kansas",
					country: "Estados Unidos",
					postalCode: "66101-66160"
				}
			],
			phones: [
				{
					id: 2,
					phone: "48996005555"
				}
			]
		}
	]
}

export const clientDetailed = {
	data: {
		id: 1,
		name: "Jill Valentine",
		cpf: "01854825698",
		sales: [
			{
				id: 1,
				clientId: 1,
				productId: 4,
				quantity: 1,
				unitPrice: "1249.00",
				totalPrice: "1249.00",
			}
		]
	}
}
