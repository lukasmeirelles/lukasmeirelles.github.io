const render = (data, htmlComponent) => {
	const margin = {
		top: 10,
		bottom: 30,
		right: 30,
		left: 40
	}
	const width = 1280 - margin.left - margin.right
	const height = 350 - margin.top - margin.bottom

	const svg = d3.select(htmlComponent).append('svg')
		.attr('width', `${width + margin.left + margin.right}`)
		.attr('height', `${height + margin.top + margin.bottom}`)
		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	const maxScore = 1000
	const brasilData = data.filter(item => item.State === 'Brasil')[0]
	const stateName = (item) => item.State


	const xAxis = d3.scaleBand()
		.range([ 0, width ])
		.domain(data.map( stateName ))
		.paddingInner(1)
		.paddingOuter(.5)

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xAxis))

	const yAxis = d3.scaleLinear()
		.domain([0, 1000])
		.range([height, 0])

	svg.append("g").call(d3.axisLeft(yAxis))

    svg.append("line")
    	.attr("x1", "0")
    	.attr("x2", `${width}`)
    	.attr("y1", yAxis(brasilData.Mean))
    	.attr("y2", yAxis(brasilData.Mean))
    	.attr("stroke", "black")

	svg.selectAll("vertLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", item => xAxis(stateName(item)) )
    		.attr("x2", item => xAxis(stateName(item)) )
    		.attr("y1", (item) => yAxis(item.Min) )
    		.attr("y2", (item) => yAxis(item.Max) )
    		.attr("stroke", "red")
    		.style("width", 40)

    const boxWidth = 10

	svg.selectAll("boxes").data(data)
    .enter()
    	.append("rect")
    		.attr("x", function(d){return(xAxis(stateName(d))-boxWidth/2)})
    		.attr("y", function(d){return(yAxis(d.Perc75))})
    		.attr("height", function(d){return(yAxis(d.Perc25)-yAxis(d.Perc75))})
    		.attr("width", boxWidth )
    		.attr("stroke", "black")
    		.attr("class", item => {
    			if (item.Region) {
    				return `${item.Region.toLowerCase()}_region`
    			}
    			return 'brazil'
    		})

	svg.selectAll("medianLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", function(d){return(xAxis(stateName(d))-boxWidth/2) })
    		.attr("x2", function(d){return(xAxis(stateName(d))+boxWidth/2) })
    		.attr("y1", function(d){return(yAxis(d.Median))})
    		.attr("y2", function(d){return(yAxis(d.Median))})
    		.attr("stroke", "black")
    		.style("width", 80)
}

//3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/ch_scores.json')
d3.json('data/ch_aggregated_scores.json')
.then(data => {
	render(data, '#ch_score')
})

d3.json('data/cn_aggregated_scores.json')
.then(data => {
	render(data, '#cn_score')
})

d3.json('data/lc_aggregated_scores.json')
.then(data => {
	render(data, '#lc_score')
})

d3.json('data/mt_aggregated_scores.json')
.then(data => {
	render(data, '#mt_score')
})

d3.json('data/writing_aggregated_scores.json')
.then(data => {
	render(data, '#writing_score')
})

