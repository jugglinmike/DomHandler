// DOM-Level-1-compliant structure
var NodePrototype = require('./node');
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

/**
 * The `NamedNodeMap` exposes `Attr` instances via the attribute name *and* via
 * numeric indices (order unspecified). In keeping with the rest of this
 * module's approach to DOM Level 1 features, implement the basic data
 * structure of these interfaces without any associated functionality.
 */
Object.defineProperty(ElementPrototype, "attributes", {
	get: function() {
		var nodeMap = {};
		var attribs = this.attribs;
		var keys = Object.keys(attribs);

		keys.forEach(function(name, idx) {
			nodeMap[name] = nodeMap[idx] = {
				name: name,
				value: attribs[name]
			};
		});
		nodeMap.length = keys.length;

		return nodeMap;
	}
});

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});
