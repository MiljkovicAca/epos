$(function(){

	$('.dugme').mouseenter(function(){
		$(this).css("background-color","#EE6352");
	})

	$('.dugme').mouseleave(function(){
		$(this).css("background-color","#57A773")
	})

	$('.s').click(function(){

		var ranBr = Math.random()*6;
		if(ranBr<1)$(this).attr("src","CONTENT/Images/skocko.png");
		else if(ranBr<2)$(this).attr("src", "CONTENT/Images/tref.png");
		else if(ranBr<3)$(this).attr("src","CONTENT/Images/pik.png");
		else if(ranBr<4)$(this).attr("src","CONTENT/Images/herc.png");
		else if(ranBr<5)$(this).attr("src","CONTENT/Images/zvezda.png");
		else $(this).attr("src","CONTENT/Images/karo.png");
	})

});