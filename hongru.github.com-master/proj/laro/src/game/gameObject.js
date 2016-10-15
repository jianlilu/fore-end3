/**
 * GameObject
 * {Class}
 * ������͹�����Ϸ�в�ͬlayers
 * �����ж��layers��ɵı���
 * �ɵ���layer��ɵ������������ȵ�
 */

Laro.register('.game', function (La) {
		
	var Class = Laro.Class;

	/**
	 * base Class
	 * ����
	 */
	var GameObject = Class(function (x, y, z, manager) {
		this.x = x || 0;
		this.y = y || 0;
		this.zOrder = z || 0;
		this.manager = manager;

	}).methods({
		joinIn: function (manager) {
			this.manager = manager;
		}, 
		startUp: function (x, y, z) {
			if (x != undefined) this.x = x;
			if (y != undefined) this.y = y;
			if (z != undefined) this.zOrder = z;

			this.manager.addGameObject(this);
		},
		shutDown: function () {
			this.manager.removeGameObject(this);
		}

	});

		
})

