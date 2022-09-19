import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@toast-ui/react-editor';
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr';
// import 'codemirror/lib/codemirror.css';

// interface IWrapperedEditorProps {
//     forwardedRef:any;
//     colorSyntaxOptions:any;
// }

const WrappedEditor = (props:any) => {
    const { forwardedRef } = props;

    // 3. Pass down forwardRef to Editor(the real component that needs)
    return <Editor
        {...props}
        ref={forwardedRef}
        usageStatistics={false}
        plugins={[[colorSyntax, props.colorSyntaxOptions], tableMergedCell]}
    />
}

WrappedEditor.propTypes = {
    props: PropTypes.object,
    forwardedRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired
}

export default WrappedEditor;
