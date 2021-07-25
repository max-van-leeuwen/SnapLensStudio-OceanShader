// Max van Leeuwen
// maxvanleeuwen.com, ig @max.van.leeuwen, twitter @maksvanleeuwen
//
// Ocean Shader example project
// Cycles through hue of ocean shader colours



//@input bool on
//@input float animSpeed = 1
//@input float colourSaturation = .7
//@input float colourValue = .7



var anim = 0;
var oceanShader = script.getSceneObject().getComponent("Component.MeshVisual").getMaterial(0);



// covert HSV to RGB (0-1)
function HSVtoRGB(h, s, v){
	var r, g, b;
	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}

	return new vec3(r, g, b);
}



function everyFrame (eventData){
	// increase animation, cycle 0-1
	anim += getDeltaTime() * script.animSpeed;

	// increase values on shader, rim colour has offset
	oceanShader.mainPass.waterColour = HSVtoRGB(anim % 1, script.colourSaturation, script.colourValue);
	oceanShader.mainPass.rimColour = HSVtoRGB((anim + .5) % 1, script.colourSaturation, script.colourValue);
}



if(script.on){
	var everyFrameEvent = script.createEvent("UpdateEvent");
	everyFrameEvent.bind(everyFrame);
}