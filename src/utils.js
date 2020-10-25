const translateState = (state) => {
	switch(state.toLowerCase()) {
		case "brasil":
			return "Brasil"
		case "ac":
			return "Acre"
		case "al":
			return "Alagoas"
		case "am":
			return "Amazonas"
		case "ap":
			return "Amapá"
		case "ba":
			return "Bahia"
		case "ce":
			return "Ceará"
		case "df":
			return "Distrito Federal"
		case "es":
			return "Espírito Santo"
		case "go":
			return "Goiás"
		case "ma":
			return "Maranhão"
		case "mg":
			return "Minas Gerais"
		case "ms":
			return "Mato Grosso do Sul"
		case "mt":
			return "Mato Grosso"
		case "pa":
			return "Pará"
		case "pb":
			return "Paraíba"
		case "pe":
			return "Pernambuco"
		case "pi":
			return "Piauí"
		case "pr":
			return "Paraná"
		case "rj":
			return "Rio de Janeiro"
		case "rn":
			return "Rio Grande do Norte"
		case "ro":
			return "Rondônia"
		case "rr":
			return "Roraima"
		case "rs":
			return "Rio Grande do Sul"
		case "sc":
			return "Santa Catarina"
		case "se":
			return "Sergipe"
		case "sp":
			return "São Paulo"
		case "to":
			return "Tocantins"
		default:
			return state
	}
}

const translateRegion = (region) => {
	switch(region.toLowerCase()) {
		case "brazil":
			return "Brasil"
		case "co":
			return "Centro-Oeste"
		case "n":
			return "Norte"
		case "ne":
			return "Nordeste"
		case "s":
			return "Sul"
		case "se":
			return "Sudeste"
		default:
			return region
	}
}

const normalizeGrade = (grade) => {
	return Number(grade).toFixed(2)
}

const translateSchool = (school) => {
	switch(school.toLowerCase()) {
		case "public":
			return "Escola pública"
		case "private":
			return "Escola privada"
		default:
			return school
	}
}

const setUpTooltipEvents = (svgComponent, messageFunction) => {
    svgComponent.on('mouseover', item => {
        d3.select('#tooltip')
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px')
            .style('opacity', 1)
            .html(messageFunction(item));
    })
    svgComponent.on('mouseout', () => {
        d3.select('#tooltip').style('opacity', 0)
    })
}
