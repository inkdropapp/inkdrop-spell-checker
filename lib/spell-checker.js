'use strict';

var _codemirrorSpellCheckerInkdrop = require('codemirror-spell-checker-inkdrop');

var _codemirrorSpellCheckerInkdrop2 = _interopRequireDefault(_codemirrorSpellCheckerInkdrop);

var _spellCheckerDisplay = require('./spell-checker-display');

var _spellCheckerDisplay2 = _interopRequireDefault(_spellCheckerDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  activate() {
    const { CodeMirror } = require('inkdrop');
    let language = inkdrop.config.get('plugins.spell-checker.language');
    if (!language) {
      language = 'en_US';
    }

    // Store the latest languages
    inkdrop.config.set('plugins.spell-checker.languages', _codemirrorSpellCheckerInkdrop2.default.languages);

    (0, _codemirrorSpellCheckerInkdrop2.default)({
      codeMirrorInstance: CodeMirror,
      ignoreCodeBlocks: true,
      language: language
    });
    global.inkdrop.on('editor:init', this.handleEditorInit.bind(this));

    inkdrop.components.registerClass(_spellCheckerDisplay2.default);
    inkdrop.layouts.addComponentToLayout('modals', 'LanguageChooser');
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout('modals', 'LanguageChooser');
    inkdrop.components.deleteClass(_spellCheckerDisplay2.default);

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