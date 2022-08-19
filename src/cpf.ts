export function getEstado(cpf:string) {
	const estados = [
		"Rio Grande do Sul",
		"Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul e Tocantins",
		"Amazonas, Pará, Roraima, Amapá, Acre e Rondônia",
		"Ceará, Maranhão e Piauí",
		"Paraíba, Pernambuco, Alagoas e Rio Grande do Norte",
		"Bahia e Sergipe",
		"Minas Gerais",
		"Rio de Janeiro e Espírito Santo",
		"São Paulo",
		"Paraná e Santa Catarina"
	]
	return estados[Number(cpf[8])]
}

function validateCPF(cpf: string) {
	let soma = 0

	for (let i = 0; i < 9; i++) {
		let t = Number(cpf[i]) * (10 - i)
		soma += t
	}

	let resto = (soma * 10) % 11

	if (Number(cpf[9]) != resto) {
		return false
	}

	soma = 0

	for (let i = 0; i < 10; i++) {
		let t = Number(cpf[i]) * (11 - i)
		soma += t
	}

	resto = (soma * 10) % 11

	return (resto === Number(cpf[10]))
}

////não faço ideia de como nomear essas funcoes lmao, coloquei qualquer merda

/**
	 * Returns all indexes with the character  
	 * Ex:
	 * ```js
	 * "hello".findAllIndexOf('l')
	 * //[2,3]
	 * ```
	 */
function findAllIndexOf(str:string,character: string) {
	let r = []

	for (let i = 0; i < str.length; i++) {
		const e = str[i];
		if (e === character) {
			r.push(i)
		}
	}

	return r
}

function addZeroesToNumber(num: number,amount:number) {
	let t = num.toString()
	if (t.length === amount) {
		return `${num}`
	}
	let r = ""
	for (let i = 0; i < (amount - t.length); i++) {
		r += "0"
	}
	
	return `${r}${num}`
}

function getNumeral(n: number) {
	let r = ""
	for (let i = 0; i < n; i++) {
		r += "9"
	}
	return Number(r)
}

function replaceFromCPF(cpf: string, n:number) {
	let idx = findAllIndexOf(cpf,'x')
	let res = []
	for (let i = 0; i < cpf.length; i++) {
		const e = cpf[i];
		res[i] = e
	}
	for (let i = 0; i < idx.length; i++) {
		const e = idx[i];
		let te = addZeroesToNumber(n, idx.length)
		if (te) {
			res[e] = te[i]
		}
	}
	return res.join('')
}

export function descobreCPFs(cpf: string,completo:boolean) {
	let cpfs = []
	let n = findAllIndexOf(cpf, 'x').length
	
	for (let i = 0; i < getNumeral(n); i++) {
		let _cpf = replaceFromCPF(cpf, i)

		if (validateCPF(_cpf)) {
			cpfs.push(
				completo ? {cpf: _cpf, estado: getEstado(_cpf) }:
				_cpf
			)
		}
	}

	return cpfs
}
