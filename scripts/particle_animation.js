(function($){
	jQuery.fn.extend({
		myPlugin : function(options){

      var canvas = document.getElementById("canvas");
      var particles = [];
      var ctx = canvas.getContext('2d');

      var settings = $.extend({
          number_of_particles : 50,
          //particle_height: 3,
          //particle_width : 3,
          radius : 3,
          speed : 80
      } ,options);

			return this.each(function(){

        for(var i=0; i<settings.number_of_particles; i++){
            particles.push(new createParticle(Math.random()*canvas.width,Math.random()*canvas.height));
        }

        function createParticle(x,y){
            this.x_pos = x;
            this.y_pos = y;

            this.vx = Math.random()*20-10;
            this.vy = Math.random()*20-10;

            this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        }

        function drawParticles(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(var t=0; t<particles.length; t++){
                var p = particles[t];
                
                drawCircles(p);

                p.x_pos += p.vx;
                p.y_pos += p.vy;

                if(p.x_pos-settings.radius > canvas.width || p.x_pos-settings.radius <=0)
                    p.vx = -p.vx;
                if(p.y_pos-settings.radius > canvas.height || p.y_pos-settings.radius <=0)
                    p.vy = -p.vy;
            }
        }

        function drawCircles(p){
            ctx.fillStyle = p.color;
            //ctx.fillRect(p.x_pos,p.y_pos,settings.particle_width,settings.particle_height);
            ctx.beginPath();
            ctx.arc(p.x_pos,p.y_pos,settings.radius,0,2*Math.PI);
            ctx.fill();
        }

        $("#canvas").click(function(e){
            x = e.pageX;
            y = e.pageY;
            //settings.radius = 5;
            for(var i=0; i<20; i++){
                particles.push(new createParticle(x,y));
            }
        });

        setInterval(drawParticles, settings.speed);
			});
		}
	});
})(jQuery);
