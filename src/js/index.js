import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState,convertToRaw,ContentState} from 'draft-js';
import ToolBar from './toolbar';

import {stateToHTML} from 'draft-js-export-html';

import {getCurrentBlock,resetBlockWithType,addNewBlockAt} from './model'

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
    this.handleReturn = this.handleReturn.bind(this);
  }
  handleReturn(e) {
    var editor = this.state.editorState
    // 得到当前ContentState对象
    var content = this.state.editorState.getCurrentContent()
    var prevKey = editor.getSelection().getStartKey()
    // 判断当前内容块是否为空
    if(content.getBlockForKey(prevKey).getText() == ""){
      // 重绘编辑器
      this.setState({editorState:this.jumpOut(editor)})
      // 阻止默认行为
      return "handled";
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
        handleReturn={this.handleReturn}
		/>		
		</div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);