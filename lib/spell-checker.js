'use strict';

var _codemirrorSpellCheckerInkdrop = require('codemirror-spell-checker-inkdrop');

var _codemirrorSpellCheckerInkdrop2 = _interopRequireDefault(_codemirrorSpellCheckerInkdrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  activate() {
    const { CodeMirror } = require('inkdrop');
    (0, _codemirrorSpellCheckerInkdrop2.default)({
      codeMirrorInstance: CodeMirror,
      ignoreCodeBlocks: true
    });
    global.inkdrop.on('editor:init', this.handleEditorInit.bind(this));
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor();
    if (editor && editor.codeMirror && this.originalMode) {
      editor.codeMirror.setOption('mode', this.originalMode);
    }
  },

  handleEditorInit(editor) {
    const cm = editor.codeMirror;
    this.originalMode = cm.getOption('mode');
    cm.setOption('backdrop', this.originalMode);
    cm.setOption('mode', 'spell-checker');
  }
};