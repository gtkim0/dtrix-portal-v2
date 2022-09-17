import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@toast-ui/react-editor';
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

interface IWrapperedEditorProps {
    forwardedRef:any;
    colorSyntaxOptions:any;
}

const WrappedEditor:FC<IWrapperedEditorProps> = (props) => {
    const {forwardedRef} = props;

    return (
        <Editor
            {...props}
            ref={forwardedRef}
            usageStatistics={false}
            plugins={[[colorSyntax,props.colorSyntaxOptions],tableMergedCell]}
        />
    )
}

export default WrappedEditor;
