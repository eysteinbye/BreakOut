var Block = function(x, y, durability) {
    this.X = x;
    this.Y = y;
    this.Width = BLOCK_WIDTH;
    this.Height = BLOCK_HEIGHT;
    this.Upper = this.Y;
    this.Lower = this.Y + this.Height;
    this.Right = this.X + this.Width;
    this.Left = this.X;
    this.hitsLeft = durability;
    this.Show = true;
};

Block.prototype.intersect = function(ball) {
	if (this.Show) {
		if ((this.X <= ball.Left() && ball.Left() <= this.Right) || (this.X <= ball.Right() && ball.Right() <= this.Right)){
			if((this.Y <= ball.Upper() && ball.Upper() <= this.Lower) || (this.Y <= ball.Lower() && ball.Lower() <= this.Lower)){
				if(this.X < ball.X && ball.X < this.Right) {
					ball.bounceOfCeling(); 
					return true;
					// flat = true;
				}else if(this.Y < ball.Y && ball.Y < this.Lower) {
					ball.bounceOfWall(); 
					return true;
					
					// side = true;
				}else {		
					// corner
					// har corner blokk ve siden av?
			
					var under = false;
					var over = false;
					var middle = false;
					if(ball.Upper() < this.Lower){
						under=true;
					}else if(ball.Lower() < this.Y){
						over=true;
					}else{
						middle=true;
					}
					
					var right = false;
					var left = false;
					var center = false;
					if(ball.Left() < this.Right){
						right=true;
					}else if(ball.Right() < this.Left){
						left=true;
					}else{
						center=true;
					}
					
					if(under && right && ball.goingUpLeft()) ball.bounceBack();
					if(over && right && ball.goingDownleft()) ball.bounceBack();
					if(under && left && ball.goingUpRight()) ball.bounceBack();
					if(over && left && ball.goingDownRight()) ball.bounceBack();
					
					// Skal disse ha en litt annen vinkel?
					if(middle) ball.bounceOfWall();
					if(center) ball.bounceOfCeling();
					return true;

				}
					
	
				//console.log("Side " + side + " Flat " + flat + " Corner " + corner);
				//alert("Side " + side + " Flat " + flat + " Corner " + corner);
			
				/*
				Sjekk rettningen ballen har, og bounce ballen og hit block i denne classen
				
				*/
			
			
			}
		
		}
	
	
	
	}
	return false;
};




Block.prototype.hit = function() {
    this.hitsLeft--;
    if (this.hitsLeft == 0) {
        this.Show = false;
        paint.removeBlock(this);
    }

};