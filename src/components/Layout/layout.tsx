import type { FC, ReactNode } from 'react';
import SideLayout from "./side-layout";
import TopLayout from "./top-layout";
import {styled} from "@mui/material";
import {Box} from "@mui/material";
import {isRootSize} from "../../utils/is-root";

interface LayoutProps {
    children ?:ReactNode;
}

const RootLayout = styled('div')`
      display: flex;
      height: 100vh;
      max-width: calc(100% - 240px);
      left: 240px;
      position: relative;
      max-height: 100%;
      padding-top: 60px;
      flex: 1 1 auto;
      padding-left: isRootSize();
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