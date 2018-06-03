'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inkdrop = require('inkdrop');

let LanguageChooser = class LanguageChooser extends _inkdrop.React.Component {
  constructor(props) {
    super(props);

    let languages = inkdrop.config.get('plugins.spell-checker.languages');
    if (!languages) {
      languages = ['en_US'];
    }
    let language = inkdrop.config.get('plugins.spell-checker.language');
    if (!language) {
      language = 'en_US';
    }
    this.state = {
      languages,
      language
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.subscriptions = new _inkdrop.CompositeDisposable();
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'spell-checker:choose': () => this.choose()
    }));
  }

  componentWillUnmount() {
    this.subscriptions.dispose();
  }

  handleChange(event) {
    const language = event.target.value;

    this.setState({ language });
    inkdrop.config.set('plugins.spell-checker.language', language);

    event.preventDefault();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;

    return _inkdrop.React.createElement(
      MessageDialog,
      { className: 'spellCheck', ref: 'dialog', title: 'Choose Language' },
      _inkdrop.React.createElement(
        'div',
        null,
        _inkdrop.React.createElement(
          'p',
          null,
          'Select a language for spell checking'
        )
      ),
      _inkdrop.React.createElement('br', null),
      _inkdrop.React.createElement(
        'div',
        { className: 'ui form' },
        _inkdrop.React.createElement(
          'select',
          { onChange: this.handleChange, value: this.state.language },
          this.state.languages.map((item, index) => _inkdrop.React.createElement(
            'option',
            { key: index, value: item },
            item
          ))
        )
      ),
      _inkdrop.React.createElement('br', null),
      _inkdrop.React.createElement(
        'div',
        null,
        _inkdrop.React.createElement(
          'p',
          null,
          _inkdrop.React.createElement(
            'strong',
            null,
            'Note: You will need to restart for this change to take effect'
          )
        )
      )
    );
  }

  choose() {
    console.log('Language Selection!');

    const { dialog } = this.refs;

    if (!dialog.isShown) {
      dialog.showDialog();
    } else {
      dialog.dismissDialog();
    }
  }
};
exports.default = LanguageChooser;