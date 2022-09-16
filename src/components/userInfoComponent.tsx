import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Menu, MenuItem, MenuProps, styled, alpha } from "@mui/material";
import { authApi } from "../apis/auth-api";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";


const StyledMenu = styled((props:MenuProps)=> (
    <Menu 
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'center'
        }}
        {...props} 
        />
))(({theme})=> ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
          },
          '&:active': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
}))


const UserInfoComponent = () => {

    const { logout } = useAuth();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    // 로그아웃 함수
    const handleLogout = async ():Promise<void> => {
        try {
            await logout();
            router.push("/authentication/login");
        }catch (err:any){
            toast.error(err);
            console.error(err);
        }
    }

    const handleShowUserInfo = () => {
        try {
            router.push("/userInfo");
            handleClose();
        }catch(err){

        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleUserIconClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <>
            <Box onClick={(e) => handleUserIconClick(e)} pr={"20px"} >
                <AccountCircleIcon fontSize='large' />
            </Box>
            <StyledMenu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
            >
                <MenuItem onClick={handleShowUserInfo}>
                    유저 정보
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    로그 아웃
                </MenuItem>
            </StyledMenu>


            {/* <Menu
                sx={{top:'30px'}}
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleShowUserInfo}>유저 정보</MenuItem>
                <MenuItem onClick={handleLogout}>로그 아웃</MenuItem>
            </Menu> */}
        </>
    )
}
export default UserInfoComponent;