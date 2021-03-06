'use strict';

var Snap = require('snapsvg');

var GraphicsUtil = require('../../util/GraphicsUtil');


/**
 * @class
 *
 * A plugin that adds an outline to shapes and connections that may be activated and styled
 * via CSS classes.
 *
 * @param {EventBus} events the event bus
 */
function Outline(eventBus, styles, elementRegistry) {

  var OUTLINE_OFFSET = 5;

  var OUTLINE_STYLE = styles.cls('djs-outline', [ 'no-fill' ]);

  function createOutline(gfx, bounds) {
    return Snap.create('rect', OUTLINE_STYLE).prependTo(gfx);
  }

  function updateOutline(outline, bounds) {

    outline.attr({
      x: -OUTLINE_OFFSET,
      y: -OUTLINE_OFFSET,
      width: bounds.width + OUTLINE_OFFSET * 2,
      height: bounds.height + OUTLINE_OFFSET * 2
    });
  }

  eventBus.on('shape.added', function(event) {
    var element = event.element,
        gfx     = event.gfx;

    var outline = createOutline(gfx, element);

    updateOutline(outline, element);
  });

  eventBus.on('shape.resized', function(event) {
    var shape = event.shape,
        gfx   = elementRegistry.getGraphicsByElement(shape);

    var outline = gfx.select('.djs-outline');

    updateOutline(outline, shape);
  });

  eventBus.on('commandStack.shape.resize.reverted', function(event) {
    var shape = event.context.shape,
        gfx   = elementRegistry.getGraphicsByElement(shape);

    var outline = gfx.select('.djs-outline');

    updateOutline(outline, shape);
  });

  eventBus.on('connection.change', function(event) {
    // TODO: update connection outline box
  });

  eventBus.on('shape.change', function(event) {
    // TODO: update shape outline box
  });
}


Outline.$inject = ['eventBus', 'styles', 'elementRegistry'];

module.exports = Outline;
