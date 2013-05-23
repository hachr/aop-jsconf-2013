define(['text!./template.html', 'dom/renderList', 'dom/addClassWhile', '../pubsub'], function(template, renderList, addClassWhile, pubsub) {

	function ProductListView(node) {
		this.node = node;
	}

	ProductListView.prototype = {
		init: function(model) {
			var node = this.node;

			node.addEventListener('click', handleAddClick);

			this.destroy = function() {
				node.removeEventListener('click', handleAddClick);
				node.innerHTML = '';
			}

			this.node.innerHTML = renderList(template, model.list());

			function handleAddClick(e) {
				var itemNode, id;
				if(e.target.className === 'add') {
					itemNode = findItemNode(e.target);
					id = itemNode.getAttribute('data-item-id');

					pubsub.publish('product/add', model.find(id));
				}
			}
		},

		destroy: function() {}
	}

	return ProductListView;

	function findItemNode(startingNode) {
		var itemNode = startingNode;
		while(!itemNode.hasAttribute('data-item-id') && itemNode.parentNode) {
			itemNode = itemNode.parentNode;
		}

		return itemNode;
	}

});