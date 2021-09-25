
import { ScatterController } from "chart.js";

class Scatter3DController extends ScatterController {
	draw() {
		var meta = this.getMeta();
		if(meta.data.length > 0 ) {

			var ctx = this.chart.ctx;
			ctx.save();
			for(let i = 22; i < meta.data.length - 22; i++) {
				var pt = meta.data[i];

				const startX = pt.x;
				const startY = pt.y;
				const nextX = meta.data[i+21].x;
				const nextY = meta.data[i+21].y;



				// center
				const point0 = pt; 

				// below
				const point1 = meta.data[i - 1];

				// below right
				const point2 = meta.data[i + 20];

				// right
				const point3 = meta.data[i + 21];

				// upper right
				const point4 = meta.data[i + 22];

				// upper
				const point5 = meta.data[i + 1];

				// upper left
				const point6 = meta.data[i - 20];

				// left
				const point7 = meta.data[i - 21];

				// below left
				const point8 = meta.data[i - 22];


				// Lower right corner
				const a = (point0.x + point1.x + point2.x + point3.x)/4;
				const b = (point0.y + point1.y + point2.y + point3.y)/4;

				// Upper right corner
				const c = (point0.x + point3.x + point4.x + point5.x)/4;
				const d = (point0.y + point3.y + point4.y + point5.y)/4;

				// Upper Left corner
				const e = (point0.x + point5.x + point6.x + point7.x)/4;
				const f = (point0.y + point5.y + point6.y + point7.y)/4;


				// Lower Left corner
				const g = (point0.x + point2.x + point7.x + point8.x)/4;
				const h = (point0.y + point2.y + point7.y + point8.y)/4;

				if (d > b) {
					continue;
				}

				

				var grd1 = ctx.createLinearGradient(startX, startY, nextX, nextY);
				grd1.addColorStop(0, pt.options.backgroundColor);
				grd1.addColorStop(1, meta.data[i+22].options.backgroundColor);

				ctx.fillStyle = grd1;
				ctx.strokeStyle = grd1;
				ctx.lineWidth = 3;

				ctx.beginPath();
				ctx.moveTo(a,b);
				ctx.lineTo(c,d);
				ctx.lineTo(e,f);
				ctx.lineTo(g,h);
				ctx.lineTo(a,b);

				ctx.stroke();

				ctx.fill();
			}
			ctx.restore();
		}
	}
}

Scatter3DController.id = 'scatter3D';
Scatter3DController.defaults = ScatterController.defaults;

export default Scatter3DController;
