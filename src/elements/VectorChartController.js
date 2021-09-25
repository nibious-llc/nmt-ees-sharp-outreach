
import { ScatterController } from "chart.js";

class VectorChartController extends ScatterController {
	draw() {
		var meta = this.getMeta();
		if(meta.data.length > 0 ) {

			var ctx = this.chart.ctx;

			ctx.save();
			for(let i = 0; i < meta.data.length; i++) {
				var pt = meta.data[i];

				const startX = pt.x;
				const startY = pt.y;

				const qz = pt.options.rotation.qx;
				const qx = pt.options.rotation.qz;

				const magnitude = Math.sqrt(Math.pow(qx, 2) + Math.pow(qz, 2));
				let  angle = Math.atan(qz/qx);
				if(qx > 0) {
					angle = angle - Math.PI;
				}

				const endX = 0;
				const endY = magnitude * 10;

			
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				ctx.lineWidth = 1;
				ctx.beginPath();				
				ctx.translate(startX, startY);
				ctx.rotate(angle);

				ctx.moveTo(0, 0);
				ctx.lineTo(endX, endY);
				ctx.lineTo(endX - 3, endY - 3);
				ctx.moveTo(endX, endY);
				ctx.lineTo(endX + 3, endY - 3);
				ctx.stroke();
				ctx.rotate(-1 * angle);
				ctx.translate(-1 * startX, -1 * startY);
			}
			ctx.restore();
		}
	}
}

VectorChartController.id = 'vector';
VectorChartController.defaults = ScatterController.defaults;

export default VectorChartController;