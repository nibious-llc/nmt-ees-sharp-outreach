
import { ScatterController } from "chart.js";

class Scatter3DController extends ScatterController {
	draw() {
		var meta = this.getMeta();
		if(meta.data.length > 0 ) {

			var ctx = this.chart.ctx;
			ctx.save();
			for(let i = 0; i < meta.data.length - 22; i++) {
				var pt = meta.data[i];

				const startX = pt.x;
				const startY = pt.y;

				const aboveX = meta.data[i + 1].x;
				const aboveY = meta.data[i + 1].y;

				const nextX = meta.data[i+21].x;
				const nextY = meta.data[i+21].y;

				const nextAboveX = meta.data[i + 22].x;
				const nextAboveY = meta.data[i + 22].y;

				if(startX > aboveX) {
					//We don't need to be drawing backwards
					continue;
				}
				if(startY < aboveY) { continue; }

				var grd1 = ctx.createLinearGradient(startX, startY, nextX, nextY);
				grd1.addColorStop(0, pt.options.backgroundColor);
				grd1.addColorStop(1, meta.data[i+22].options.backgroundColor);

				ctx.fillStyle = grd1;
				ctx.strokeStyle = grd1;
				ctx.lineWidth = 3;

				ctx.beginPath();
				ctx.moveTo(startX, startY);

				ctx.lineTo(nextX, nextY);

				ctx.lineTo(nextAboveX, nextAboveY);

				ctx.lineTo(aboveX, aboveY);

				ctx.lineTo(startX, startY);

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
