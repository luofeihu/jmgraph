/**
 * 基础路径,大部分图型的基类
 * 指定一系列点，画出图形
 *
 * @class jmPath
 * @for jmGraph
 * @module jmGraph
 * @param {jmGraph} graph 画布
 * @param {object} params 路径参数 points=所有描点
 */

function jmPath(graph, params) {
	/**
	 * 当前对象类型名jmPath
	 *
	 * @property type
	 * @type string
	 */
	this.type = 'jmPath';
	var style = params && params.style ? params.style : null;
	
	this.graph = graph;
	this.points = params && params.points ? params.points : [];
	this.initializing(graph.context,style);
}
jmUtils.extend(jmPath,jmShape);//继承基础图形

/**
 * 描点集合
 * point格式：{x:0,y:0,m:true}
 * @property points
 * @type {array}
 */
jmUtils.createProperty(jmPath.prototype, 'points');

/**
 * 重写检查坐标是否在区域内
 * 支持任意多边形
 * 根据边界检查某个点是否在区域内，如果样式有fill，则只要在内有效，如果只有stroke则在边框上有效
 *
 * @method checkPoint
 * @param {point} p 待检查的坐标
 * @return {boolean} 如果在则返回true,否则返回false
 */
/*jmPath.prototype.checkPoint = function(p) {	
	var w = this.style['lineWidth'] || 1;
	var ps = this.points;

	var rotation = this.getRotation();//获取当前旋转参数
	//如果有旋转参数，则需要转换坐标再处理
	if(rotation) {
		ps = [].concat(ps);//拷贝一份数据
		ps = jmUtils.rotatePoints(ps, {
			x: rotation.rotateX,
			y: rotation.rotateY
		}, rotation.angle);
	}
	//如果当前路径不是实心的
	//就只用判断点是否在边上即可	
	if(ps.length > 2 && (!this.style['fill'] || this.style['stroke'])) {
		var i = 0;
		var count = ps.length;
		for(var j = i+1; j <= count; j = (++i + 1)) {
			//如果j超出最后一个
			//则当为封闭图形时跟第一点连线处理.否则直接返回false
			if(j == count) {
				if(this.style.close) {
					var r = jmUtils.pointInPolygon(p,[ps[i],ps[0]],w);
					if(r) return true;
				}
			} 
			else {
				//判断是否在点i,j连成的线上
				var s = jmUtils.pointInPolygon(p,[ps[i],ps[j]],w);
				if(s) return true;
			}			
		}
		//不是封闭的图形，则直接返回
		if(!this.style['fill']) return false;
	}

	var r = jmUtils.pointInPolygon(p,ps,w);
	return r;
}*/


if(typeof jmGraph != 'undefined') {
	jmGraph.prototype.shapes['path'] = jmPath;
}

