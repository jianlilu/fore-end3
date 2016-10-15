var room3D = (function () {
	// ======== private vars ========
	var faces = [];
	var scr, target, targetold, faceOver;
	var globalRX = 0, globalRY = 0;
	// ---- tweening engine ----
	var tweens = ge1doot.tweens;
	// ---- camera ----
	var camera = {
		x:  new tweens.Add(100),
		y:  new tweens.Add(100),
		z:  new tweens.Add(100, 0,0),
		rx: new tweens.Add(100, 0,0, true),
		ry: new tweens.Add(100, 0,0, true),
		zoom: new tweens.Add(100, 0.1, 1),
		focalLength: 500,
		centered: false,
		cosX: 0,
		cosY: 0,
		sinX: 0,
		sinY: 0,
		setTarget: function (target) {
			// ---- set position ----
			this.x.setTarget(target.pc.x);
			this.y.setTarget(target.pc.y);
			this.z.setTarget(target.pc.z);
			// ---- set view angles ----
			this.rx.setTarget((Math.PI * 0.5) - target.ax - globalRX);
			this.ry.setTarget((Math.PI * 0.5) - target.ay - globalRY);
			// ---- zoom ----
			this.zoom.setTarget(target.f.zoom ? target.f.zoom : 2);
			this.centered = false;
		},
		center: function () {
			this.x.setTarget(0);
			this.y.setTarget(0);
			this.z.setTarget(0);
			this.zoom.setTarget(1);
			this.centered = true;
		},
		move: function () {
			// ---- easing camera position and view angle ----
			tweens.iterate();
			// ---- additional drag/touch rotations ----
			globalRX += (((-scr.dragY * 0.01) - globalRX) * 0.1);
			globalRY += (((-scr.dragX * 0.01) - globalRY) * 0.1);
			if (!this.centered && scr.drag) {
				// ---- reset zoom & position ----
				this.center();
				targetold = false;
			}
			// ---- pre calculate trigo ----
			this.cosX = Math.cos(this.rx.value + globalRX);
			this.sinX = Math.sin(this.rx.value + globalRX);
			this.cosY = Math.cos(this.ry.value + globalRY);
			this.sinY = Math.sin(this.ry.value + globalRY);
		},
		rotate: function (x, y, z) {
			// ---- 3D rotation ----
			return {
				x: this.cosY * x - this.sinY * z,
				y: this.sinX * (this.cosY * z + this.sinY * x) + this.cosX * y,
				z: this.cosX * (this.cosY * z + this.sinY * x) - this.sinX * y	
			}
		}
	}
	// ======== points constructor ========
	var Point = function (parentFace, point, rotate) {
		this.face = parentFace;
		this.x = point[0];
		this.y = point[1];
		this.z = point[2];
		this.scale = 0;
		this.X = 0;
		this.Y = 0;
		if (rotate) {
			this.x += rotate.x;
			this.y += rotate.y;
			this.z += rotate.z;
		}
		
		return this;
	};
	// ======== points projection ========
	Point.prototype.projection = function () {
		// ---- 3D rotation ----
		var p = camera.rotate(
			this.x - camera.x.value,
			this.y - camera.y.value,
			this.z - camera.z.value
		);
		// ---- distance to the camera ----
		if (this.face) {
			var z = p.z + camera.focalLength;
			var distance = Math.sqrt(p.x * p.x + p.y * p.y + z * z);
			if (distance > this.face.distance) this.face.distance = distance;
		}
		// --- 2D projection ----
		this.scale = (camera.focalLength / (p.z + camera.focalLength)) * camera.zoom.value;
		this.X = (scr.width  * 0.5) + (p.x * this.scale);
		this.Y = (scr.height * 0.5) + (p.y * this.scale);
	};
	// ======= faces constructor ========
	var Face = function (path, f) {
		this.f = f;
		var w  = f.w * 0.5;
		var h  = f.h * 0.5;
		var ax = f.rx * Math.PI * 0.5;
		var ay = f.ry * Math.PI * 0.5;
		this.locked   = false;
		this.hidden   = f.hidden || null;
		this.visible  = true;
		this.distance = 0;
		// ---- center point ----
		this.pc = new Point(this, [f.x, f.y, f.z]);
		// ---- 3D transform ----
		var transform = function (x, y, z, ax, ay) {
			var tz = z * Math.cos(ay) + x * Math.sin(ay);
			var ty = y * Math.cos(ax) + tz * Math.sin(ax);
			return {
				x: x * Math.cos(ay) - z * Math.sin(ay),
				y: ty,
				z: tz * Math.cos(ax) - y * Math.sin(ax)
			}
		};
		// ---- quad points ----
		this.p0 = new Point(this, [f.x, f.y, f.z], transform(-w, -h, 0, ax, ay));
		this.p1 = new Point(this, [f.x, f.y, f.z], transform( w, -h, 0, ax, ay));
		this.p2 = new Point(this, [f.x, f.y, f.z], transform( w,  h, 0, ax, ay));
		this.p3 = new Point(this, [f.x, f.y, f.z], transform(-w,  h, 0, ax, ay));
		// ---- corner points ----
		this.c0 = new Point(false, [f.x, f.y, f.z], transform(-w, -h, -15, ax, ay));
		this.c1 = new Point(false, [f.x, f.y, f.z], transform( w, -h, -15, ax, ay));
		this.c2 = new Point(false, [f.x, f.y, f.z], transform( w,  h, -15, ax, ay));
		this.c3 = new Point(false, [f.x, f.y, f.z], transform(-w,  h, -15, ax, ay));
		// ---- target angle ----
		var r = transform(ax, ay, 0, ax, ay, 0);
		this.ax = r.x + Math.PI / 2;
		this.ay = r.y + Math.PI / 2;
		// ---- create 3D image ----
		this.img = new ge1doot.textureMapping.Image(scr.canvas, path + f.src, f.tl || 2);
	};
	// ======== face projection ========
	Face.prototype.projection = function () {
		this.visible = true;
		this.distance = -99999;
		// ---- points projection ----
		this.p0.projection();
		this.p1.projection();
		this.p2.projection();
		this.p3.projection();
		// ---- back face culling ----
		if (!(
			((this.p1.Y - this.p0.Y) / (this.p1.X - this.p0.X) - 
			(this.p2.Y - this.p0.Y) / (this.p2.X - this.p0.X) < 0) ^ 
			(this.p0.X <= this.p1.X == this.p0.X > this.p2.X)
		) || this.hidden) {
		//	this.visible = false;
			this.distance = -99999;
			if (!this.locked && this.hidden === false) this.hidden = true;
		}
	};
	// ======== face border ========
	Face.prototype.border = function () {
		this.c0.projection();
		this.c1.projection();
		this.c2.projection();
		this.c3.projection();
		this.pc.projection();
		scr.ctx.beginPath();
		scr.ctx.moveTo(this.c0.X, this.c0.Y);
		scr.ctx.lineTo(this.c1.X, this.c1.Y);
		scr.ctx.lineTo(this.c2.X, this.c2.Y);
		scr.ctx.lineTo(this.c3.X, this.c3.Y);
		scr.ctx.closePath();
		scr.ctx.strokeStyle = "rgb(255,255,255)";
		scr.ctx.lineWidth = this.pc.scale * this.f.w / 30;
		scr.ctx.lineJoin = "round";
		scr.ctx.stroke();
	};
	// ======== update pointer style (PC)  ========
	var pointer = function () {
		// ---- on mouse over ----	
		target = false;
		var i = 0, f;
		while ( f = faces[i++] ) {
			if (f.visible) {
				if (
					f.img.pointerInside(
						scr.mouseX,
						scr.mouseY,
						f.p0, f.p1, f.p2, f.p3
					)
				) target = f;	
			} else break;
		}
		if (target && target.f.select != false && !scr.drag) {
			faceOver = target;
			scr.container.style.cursor = "pointer";
		} else scr.container.style.cursor = "move";
	};
	// ======== onclick ========
	var click = function () {
		pointer();
		// ---- target image ----
		if (target && target.f.select != false) {
			if (target == targetold) {
				// ---- reset scene ----
				camera.center();
				targetold = false;
			} else {
				targetold = target;
				target.locked = false;
				// ---- target redirection ----
				if (target.f.target != "") {
					var i = 0, f;
					while ( f = faces[i++] ) {
						if (f.f.id && f.f.id == target.f.target) {
							target = f;
							targetold = f;
							if (f.hidden) {
								f.hidden = false;
								f.locked = true;
								targetold = false;
							}
							break;
						}
					}
				}
				// ---- move camera ----
				target.pc.projection();
				camera.setTarget(target);
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////
	var init = function (json) {
		// ---- init script ----
		scr = new ge1doot.screen.InitEvents({
			container: "screen",
			canvas: "canvas",
			click: click,
			move: pointer
		});
		// ---- create faces ----
		var i = 0, f;
		while ( f = json.faces[i++] ) {
			faces.push(
				new Face(json.path, f)
			);
		}
		// ---- engine start ----
		run();
	};
	////////////////////////////////////////////////////////////////////////////
	// ===== main loop =====
	var run = function () {
		// ---- clear screen ----
		scr.ctx.clearRect(0,0, scr.width, scr.height);
		// ---- 3D projection ----
		var i = 0, f;
		while ( f = faces[i++] ) {
			f.projection();
		}
		// ---- faces depth sorting ----
		faces.sort(function (p0, p1) {
			return p1.distance - p0.distance;
		});
		// ---- drawing ----
		var i = 0, f;
		while ( f = faces[i++] ) {
			if (f.visible) {
				// ---- draw image ----
				f.img.draw3D(f.p0, f.p1, f.p2, f.p3);
				if (f.locked && scr.drag) f.locked = false;
				if (f === faceOver) faceOver.border();
			} else break;
		}

		// ---- camera ----
		camera.move();
		// ---- loop ----
		setTimeout(run, 16);
	}
	return {    
		////////////////////////////////////////////////////////////////////////////
		// ---- onload event ----
		load : function (json) {
			window.addEventListener('load', function () {
				setTimeout(function () {
					init(json);
				}, 500);
			}, false);
		}
	}
})();