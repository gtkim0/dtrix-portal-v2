import React from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";

export interface TuiEditorWithForwardedProps extends EditorProps {
    forwardedRef?: React.MutableRefObject<Editor>;
}

// eslint-disable-next-line react/display-name
export default (props: TuiEditorWithForwardedProps) => {
    console.log(props);
    return (
        <Editor {...props} ref={props.forwardedRef}/>
        )

};