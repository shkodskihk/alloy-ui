/**
 * The Toolbar Utility
 *
 * @module aui-toolbar
 */

var Lang = A.Lang,
	isString = Lang.isString,

	NAME = 'toolbar',

	getClassName = A.ClassNameManager.getClassName,

	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical',

	CSS_TOOLBAR = getClassName(NAME),
	CSS_FIRST = getClassName(NAME, 'first'),
	CSS_HORIZONTAL = getClassName(NAME, HORIZONTAL),
	CSS_ITEM = getClassName(NAME, 'item'),
	CSS_ITEM_CONTENT = getClassName(NAME, 'item', 'content'),
	CSS_LAST = getClassName(NAME, 'last'),
	CSS_VERTICAL = getClassName(NAME, VERTICAL),

	TPL_GENERIC = '<span></span>';

	/**
	 * A base class for Toolbar, providing:
	 * <ul>
	 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
	 *    <li>The ability to manage multiple <a href="ButtonItem.html">ButtonItem</a> widgets as one group</li>
	 *    <li>Managed user interaction states (default, active, hover)</li>
	 *    <li>Keyboard accessible</li>
	 * </ul>
	 *
	 * Quick Example:<br/>
	 * 
	 * <pre><code>var instance = new A.Toolbar({
	 *	children: [
	 * 	{icon: 'plus', label: 'Add'},
	 * 	{icon: 'minus', label: 'Delete'}
	 * ]
	 * }).render();
	 * </code></pre>
	 *
	 * Check the list of <a href="Toolbar.html#configattributes">Configuration Attributes</a> available for
	 * Toolbar.
	 *
	 * @param config {Object} Object literal specifying widget configuration properties.
	 *
	 * @class Toolbar
	 * @constructor
	 * @extends Component
	 * @uses WidgetParent
	 */

function Toolbar(config) {
	Toolbar.superclass.constructor.apply(this, arguments);
}

A.mix(Toolbar, {
	NAME: NAME,

	ATTRS: {
		/**
		 * Receives an interaction state of active when the user clicks on it.
		 *
		 * @attribute activeState
		 * @type boolean
		 */
		activeState: {},

		/**
		 * Receives a default interaction state.
		 *
		 * @attribute defaultState
		 * @type boolean
		 */
		defaultState: {},

		/**
		 * Receives an interaction state of hover during the
	     * <code>mouseover</code> event.
		 *
		 * @attribute hoverState
		 * @type boolean
		 */
		hoverState: {},

		/**
		 * The default type of child widget to render into the Element
		 *
		 * @attribute defaultChildType
		 * @default ButtonItem
		 * @type String | Object
		 */
		defaultChildType: {
			value: 'ButtonItem'
		},

		/**
		 * The orientation, horizontal or vertical, of the toolbar.
		 *
		 * @attribute orientation
		 * @default horizontal
		 * @type string
		 */
		orientation: {
			value: 'horizontal',
			setter: '_setOrientation'
		}
	}
});

A.extend(Toolbar, A.Component, {
	BOUNDING_TEMPLATE: TPL_GENERIC,
	CONTENT_TEMPLATE: TPL_GENERIC,

	/**
	 * Construction logic executed during Toolbar instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		A.Do.before(instance._addByIconId, instance, 'add');
	},

	/*
	* Lifecycle
	*/

	/**
	 * Bind the events on the Toolbar UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		instance.on('addChild', instance._onAddButton);

		instance.after('addChild', instance._afterAddButton);
		instance.after('removeChild', instance._afterRemoveButton);

		instance.after('orientationChange', instance._afterOrientationChange);
	},

	/**
	 * Sync the Toolbar UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function() {
		var instance = this;

		var length = instance.size() - 1;

		instance._uiSetOrientation(instance.get('orientation'));

		instance.each(
			function(item, index, collection) {
				var itemBoundingBox = item.get('boundingBox');

				itemBoundingBox.toggleClass(CSS_FIRST, index == 0);
				itemBoundingBox.toggleClass(CSS_LAST, index == length);

				itemBoundingBox.addClass(CSS_ITEM);
			}
		);
	},

	/*
	* Methods
	*/

	/**
	 * Overloads the add method so that if only a string is passed in, it will be
	 * assumed to be the icon, and will automatically create a configuration
	 * object for it.
	 *
	 * @method _addByIconId
	 * @param {String} icon the icon name or object or array of objects to add to the toolbar
	 * @protected
	 * @return {String}
	 */
	_addByIconId: function(icon) {
		var instance = this;

		if (Lang.isString(icon)) {
			var item = {
				icon: icon
			};

			return new A.Do.AlterArgs(null, [item]);
		}
	},

	/**
	 * Syncs the UI after a button is added.
	 *
	 * @method _afterAddButton
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterAddButton: function(event) {
		var instance = this;

		instance.syncUI();
	},

	/**
	 * Syncs the UI after a button is removed.
	 *
	 * @method _afterRemoveButton
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterRemoveButton: function(event) {
		var instance = this;

		event.child.destroy();

		instance.syncUI();
	},

	/**
	 * Handles the logic after the orientation is set.
	 *
	 * @method _afterOrientationChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterOrientationChange: function(event) {
		var instance = this;

		instance._uiSetOrientation(event.newVal);
	},

	/**
	 * Setter for the orientation attribute
	 *
	 * @method _setOrientation
	 * @protected
	 */
	_setOrientation: function(value) {
		var instance = this;

		return String(value).toLowerCase();
	},

	/**
	 * Updates the UI for the orientation attribute in response to the <a href="Toolbar.html#event_orientationChange">orientationChange</a> event.
	 *
	 * @method _uiSetOrientation
	 * @param {String} newVal The new value
	 * @protected
	 */
	_uiSetOrientation: function(newVal) {
		var instance = this;

		var boundingBox = instance.get('boundingBox');

		if (newVal == HORIZONTAL) {
			boundingBox.replaceClass(CSS_VERTICAL, CSS_HORIZONTAL);
		}
		else if (newVal == VERTICAL) {
			boundingBox.replaceClass(CSS_HORIZONTAL, CSS_VERTICAL);
		}
	}
});

var WidgetParentId = function() {
	var instance = this;

	instance._CHILD_MAP = new A.DataSet();

	instance.on('addChild', instance._onAddChildById);

	instance.after('addChild', instance._afterAddChildById);
	instance.after('removeChild', instance._afterRemoveChildById);

	A.Do.before(instance._findById, instance, 'item');
	A.Do.before(instance._findById, instance, 'remove');
};

WidgetParentId.prototype = {
	_afterAddChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		instance._CHILD_MAP.insert(event.index, id, event.child);
	},

	_afterRemoveChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		instance._CHILD_MAP.removeKey(id);
	},

	_findById: function(id) {
		var instance = this;

		if (Lang.isString(id)) {
			var index = instance._CHILD_MAP.indexOfKey(id);

			return new A.Do.AlterArgs(null, [index]);
		}
	},

	_getItemById: function(id) {
		var instance = this;

		var index = -1;

		if (Lang.isString(id)) {
			index = instance._CHILD_MAP[id];
		}

		return index;
	},

	_onAddChildById: function(event) {
		var instance = this;

		var id = event.child.get('id');

		if (instance._CHILD_MAP.indexOfKey(id) > -1) {
			event.preventDefault();
		}
	}
};

A.Toolbar = A.Base.build(NAME, Toolbar, [A.WidgetParent, WidgetParentId], { dynamic: false });