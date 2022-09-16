import type { FC, ReactNode } from 'react';
import SideLayout from "./side-layout";
import TopLayout from "./top-layout";
import {createTheme, styled} from "@mui/material";
import {Box} from "@mui/material";
import {isRootSize} from "../../utils/is-root";
import {headerSize} from "../../utils/is-root";

interface LayoutProps {
    children ?:ReactNode;
}

const RootLayout = styled('div')`
      display: flex;
      height: 100vh;
      background:white;
      max-width: calc(100% - ${isRootSize()}px);
      left: ${isRootSize()}px;
      position: relative;
      max-height: 100%;
      padding-top: ${headerSize()}px;
      flex: 1 1 auto;
`;

const Layout: FC<LayoutProps> = (props) => {

    const {children} = props;
    return (
        <>
            <RootLayout>
                <Box
                    sx={{
                        display:'flex',
                        flex:'1 1 auto',
                        flexDirection:'column',
                        // background:'lightGray'
                    }}
                >
                    {children}
                </Box>
            </RootLayout>
            <SideLayout />
            <TopLayout />
        </>
    )
}

export default Layout;