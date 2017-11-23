import React from 'react';
import {RichUtils} from 'draft-js';
import '../iconfont/iconfont';
class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onTab = this._onTab.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }
    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
        if (newState) {
          this.props.onChange(newState);
          return true;
        }
        return false;
      }

      _onTab(e) {
        const maxDepth = 4;
        this.props.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
      }

      _toggleBlockType(blockType) {
        this.props.onChange(
          RichUtils.toggleBlockType(
            this.props.editorState,
            blockType
          )
        );
      }

      _toggleInlineStyle(inlineStyle) {
        this.props.onChange(
          RichUtils.toggleInlineStyle(
            this.props.editorState,
            inlineStyle
          )
        );
      }
    render() {
        return (
			<Controls
                editorState={this.props.editorState}
                onBlockToggle={this.toggleBlockType}
                onInlineToggle={this.toggleInlineStyle} 
              />
            )
    }
};

class Button extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        console.log(this.props.active)
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (<button className={className} data-label={this.props.label} onMouseDown={this.onToggle}>
            <svg className="icon" aria-hidden="true"><use xlinkHref={'#icon-'+this.props.icon}></use></svg>
        </button>);
    }
}
class SeperateLine extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <span className="Edit-Seperate-line"></span>
        )
    }
}


const EDIT_BUTTONS = [
    {
        label: 'Bold',
        style: 'BOLD',
        type:'inline',
        icon: 'B'
    }, {
        label: 'Italic',
        style: 'ITALIC',
        type:'inline',
        icon :'i'
        
    },{
        label:'span',
        style:'seperate',
        type:'seperate-line'
    },{
        label: 'H3',
        style: 'header-three',
        type: 'block',
        icon: 'h'
    },{
        label: 'Blockquote',
        style: 'blockquote',
        type:'block',
        icon :'icon-test'
    }, {
        label: 'Code Block',
        style: 'code-block',
        type: 'block',
        icon:'ai-code'
    }, {
        label: 'OL',
        style: 'ordered-list-item',
        type:'block',
        icon : 'ol'
    },{
        label: 'UL',
        style: 'unordered-list-item',
        type:'block',
        icon : 'ul'
    },{
        label:'span1',
        style:'seperate',
        type:'seperate-line'
    },{
        label: 'Monospace',
        style: 'CODE',
        type:'inline'        
    }
];

const Controls = (props) => {
    const {editorState} = props;
    //block    
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    //inline
    var currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (<div className="RichEditor-controls">
        {EDIT_BUTTONS.map((item) => {
            if(item.type === 'block' ){
                return <Button key={item.label} icon={item.icon} active={item.style === blockType} label={item.label} onToggle={props.onBlockToggle} style={item.style}/>;
            }else if(item.type === 'inline'){
                return <Button key={item.label} icon={item.icon}  active={currentStyle.has(item.style)} label={item.label} onToggle={props.onInlineToggle} style={item.style}/>;
            }else if(item.type === 'seperate-line'){
                return <SeperateLine key={item.label}></SeperateLine>;
            }
        })}
    </div>);
};
export default ToolBar;