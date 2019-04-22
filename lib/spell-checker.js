"use strict";

var _codemirrorSpellCheckerInkdrop = _interopRequireDefault(require("codemirror-spell-checker-inkdrop"));

var _codemirror = _interopRequireDefault(require("codemirror"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = {
  activate() {
    (0, _codemirrorSpellCheckerInkdrop["default"])({
      codeMirrorInstance: _codemirror["default"],
      ignoreCodeBlocks: true
    });
    global.inkdrop.onEditorLoad(this.handleEditorInit.bind(this));
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor();

    if (editor && editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode);
    }
  },

  handleEditorInit(editor) {
    const {
      cm
    } = editor;
    this.originalMode = cm.getOption('mode');
    cm.setOption('backdrop', this.originalMode);
    cm.setOption('mode', 'spell-checker');
  }

};