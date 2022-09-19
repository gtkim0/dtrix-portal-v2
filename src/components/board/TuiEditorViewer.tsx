import React from 'react';
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import type {FC} from 'react';

interface ITuiEditorViewer {
    content : string
}

const TuiEditorViewer:FC<ITuiEditorViewer> = (props) => {

    const {content} = props;

    return (
        <>
            <Viewer initialValue={content} />
        </>
    )
}

export default TuiEditorViewer;