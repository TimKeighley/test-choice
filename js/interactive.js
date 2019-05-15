window.onload = function() {
  const svg = getSvg();
  // add stylesheet
  const styleLink = svg.parentNode.createProcessingInstruction('xml-stylesheet',
      'href="../css/svg_style.css" type="text/css"');
  svg.parentNode.insertBefore(styleLink, svg);

  // setup interactivity
  const toggles = svg.getElementsByClassName('toggle');
  for (const tgl of toggles) {
    // Add callbacks for toggle elements
    tgl.addEventListener('click', toggleSubtree);
    // hide all subtrees
    toggle(getSubtree(tgl));
  }
};

/**
 * Toggle the display of sub-trees in the diagram based
 * on which node has received a click event
 *
 * @param {Event} event The event that triggered the callback.
 */
function toggleSubtree(event) {
  const target = getSubtree(event.target);
  toggle(target);
  if (target.style.display === 'block') {
    $.scrollTo(target, 300);
  }
}

/**
 * Toggle the visibility of a subtree
 * @param {Element} subtree
 */
function toggle(subtree) {
  if (subtree.style.display === 'none') {
    subtree.style.display = 'block';
  } else {
    subtree.style.display = 'none';
  }
}

/**
 * Get embedded SVG object
 * @return {Object} SVG object
 */
function getSvg() {
  const obj = document.getElementById('test-choice');
  const doc = obj.contentDocument || obj.contentWindow.document;
  return doc.getElementsByTagName('svg')[0];
}

/**
 * Obtain a subtree of the diagram attached to a toggle node
 * @param {Element} target Target of a user interaction to toggle visibility
 *    of a subtree.
 * @return {Element} The subtree attached to the toggle.
 */
function getSubtree(target) {
  const svg = getSvg();
  while (target.getAttribute('class') !== 'toggle' && target != svg) {
    target = target.parentElement;
  }
  const subId = target.dataset.subtree;
  return svg.getElementById(subId);
}
