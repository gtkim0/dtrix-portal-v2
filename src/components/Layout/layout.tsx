import type {FC, ReactNode} from 'react';
import SideLayout from "./side-layout";
import TopLayout from "./top-layout";
import {createTheme, styled} from "@mui/material";
import {Box} from "@mui/material";
import {isRootSize} from "../../utils/is-root";
import {headerSize} from "../../utils/is-root";
import SplitPane from "react-split-pane";
import {useState} from "react";

// import styled from "styled-components";
interface LayoutProps {
    children?: ReactNode;
}

const RootLayout = styled('div')`
  display: flex;
  height: 100vh;
  background: white;
  max-width: calc(100% - ${isRootSize()}px);
  left: ${isRootSize()}px;
  position: relative;
  max-height: 100%;
  padding-top: ${headerSize()}px;
  flex: 1 1 auto;
`;

const Wrapper = styled('div')`
  .Resizer {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Pane1 {
    // background-color: blue;
    display: flex;
    min-height: 0;
  }

  .Pane2 {
    // background-color: red;
    display: flex;
    min-height: 0;
  }
`;

const Layout: FC<LayoutProps> = (props) => {

    const [size, setSize] = useState<number>(0);
    const {children} = props;
    // @ts-ignore
    return (
        <>
            <TopLayout/>
            <RootLayout>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        // background:'lightGray'
                    }}
                >
                    {children}
                </Box>
            </RootLayout>
            <SideLayout/>
        </>
    )
}

export default Layout;