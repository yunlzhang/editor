import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState,convertToRaw,ContentState} from 'draft-js';
import ToolBar from './toolbar';

import {stateToHTML} from 'draft-js-export-html';

/**
 * css
 */
import 'draft-js/dist/Draft.css';
import '../css/normalize.css';
import '../css/toolbar.css';
import '../css/edit.css';

/**
 * css end
 */
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      this.setState({editorState});
      const content = this.state.editorState.getCurrentContent();
      let html = stateToHTML(content);
    }
  }
  
  render() {

	const {editorState} = this.state;
	
	let className = 'RichEditor-editor';
	var contentState = editorState.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== 'unstyled') {
			className += ' RichEditor-hidePlaceholder';
		}
	}
    return (
        <div className={className}>
		<ToolBar editorState={this.state.editorState} onChange={this.onChange}/>
		<Editor editorState={this.state.editorState} 
				onChange={this.onChange}
        placeholder="输入内容......" 
        spellCheck={true}
		/>		
		</div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);