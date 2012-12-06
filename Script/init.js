

var ee = {};

ee.eystein = function() {
	
	
	function demo(ss){
		return ss * 2;
	}
	
	
	var x=4;
	return x + demo(3);
}

ee.prototype.bye = function() { return 3; };


document.write ("-------<br>");

document.write (ee.eystein());
document.write (ee.bye());
