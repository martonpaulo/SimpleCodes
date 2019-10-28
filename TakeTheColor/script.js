var clickedCircles = {};

var sizeParameter;

if((screen.height < 500) || (screen.width < 500)){
	sizeParameter = 50;
}else if((screen.height < 1000) || (screen.width < 1000)){
	sizeParameter = Math.min(screen.height, screen.width)/10;
}else{
	sizeParameter = 200;
}

const verticalQty = Math.floor(screen.height / (sizeParameter*1.5));
const horizontalQty = Math.floor(screen.width / (sizeParameter*1.5));



function getRandomColor(){
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i=0; i<6; i++){
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


function fillPageWithCircles(){

	for(let i=0; i<verticalQty; i++){
		
		$('#app').append('<div class="circleRow" id="circleRow' + i + '"></div>');

		for(let j=0; j<horizontalQty; j++){

			let circleId = '' + i + 'x' + j;
			$('#circleRow' + i).append('<div class="circle" id="' + circleId + '"></div>');
			clickedCircles[circleId] = false;
		}
	}
}




$(document).ready(function(){

	fillPageWithCircles();


	$('.circle').each(function(i){
		this.style.backgroundColor = getRandomColor();
		$(this).width(sizeParameter).height(sizeParameter);
	})


	$('.circle').on({

		mouseenter: function(){
			if(!clickedCircles[this.id]){
				$(this).css('background-color', getRandomColor());
			}
		},

		click: function(){

			clickedCircles[this.id] = !clickedCircles[this.id];
			
			if(clickedCircles[this.id]){
				$(this).css('background-color', 'black');
			}else{
				$(this).css('background-color', getRandomColor());
			}



			for(let i=0; i<verticalQty; i++){

				let isAllHorizontalCirclesClicked = true;

				for(let j=0; j<horizontalQty; j++){
				
					if(!clickedCircles['' + i + 'x' + j]){
						isAllHorizontalCirclesClicked = false;
					}
				}

				if(isAllHorizontalCirclesClicked){
					$('#circleRow' + i).remove();
				}

			}


			// i: row 
			// j: column

			for(let j=0; j<horizontalQty; j++){

				let isAllVerticalCirclesClicked = true;

				for(let i=0; i<verticalQty; i++){
				
					if(!clickedCircles['' + i + 'x' + j]){
						isAllVerticalCirclesClicked = false;
					}
				}

				if(isAllVerticalCirclesClicked){
					for(let i=0; i<verticalQty; i++){
						$('#' + i + 'x' + j).remove();
					}
				}

			}

		}
	});	
});