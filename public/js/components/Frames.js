"use strict";

const React = require("react");
const { DOM: dom } = React;
const { div } = dom;
const { bindActionCreators } = require("redux");
const { connect } = require("react-redux");
const actions = require("../actions");
const { basename } = require("../util/path");
const { getFrames, getSelectedFrame } = require("../selectors");

require("./Frames.css");

function renderFrameTitle(frame) {
  let title;
  if (frame.type == "call") {
    let c = frame.callee;
    title = c.name || c.userDisplayName || c.displayName || "(anonymous)";
  } else {
    title = "(" + frame.type + ")";
  }

  return div({ className: "title" }, title);
}

function renderFrameLocation(frame) {
  return div({ className: "location" }, basename(frame.where.source.url));
}

function Frames({ frames, selectedFrame, selectFrame }) {
  return div(
    { className: "pane-info frames" },
    !frames ?
      div({ className: "empty" }, "Not Paused") :
      dom.ul(null, frames.map(frame => {
        return dom.li({ className: selectedFrame === frame ? "selected" : "",
                        onClick: () => selectFrame(frame)
                      },
                      renderFrameLocation(frame),
                      renderFrameTitle(frame));
      }))
  );
}

module.exports = connect(
  state => ({
    frames: getFrames(state),
    selectedFrame: getSelectedFrame(state)
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Frames);
