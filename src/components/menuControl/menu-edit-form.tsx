import React, {useState} from 'react';
import type {FC} from 'react';
import {Box, Container, Card, Divider, Grid,TextField, Typography, Button,FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import {useFormik} from "formik";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import { menuApi } from '../../apis/menu-api';
import {toast} from 'react-hot-toast';


interface IMenuEditFormProps {
    handleClose: any;
}

const MenuEditForm:FC<IMenuEditFormProps> = (props) => {

    const {handleClose} = props;

    const [board,setBoard] = useState(false);
    const [dashboard, setDashBoard] = useState(false);

    const formik = useFormik({
        initialValues: {
            menuName:'123',        //메뉴 이름
            parentMenu:0,       //상위 메뉴
            menuSort:'123',        //메뉴 정렬 
            menuAuthority:'123',   //권한 설정
            none:false,
            board:'',
            dashboard:'',
            menuDescription:'',
            menuPublic:true
        },
        onSubmit: async (values, helpers):Promise<void> => {
             //TODO 메뉴 수정 API 적용해야함.
            // props 로 수정팝업의 메뉴아이디를 가져와서 patch 함
            try {   
                // const result = menuApi.updateMenu(props.menuId,values);
                // if(result === true){
                //     helpers.setSubmitting(false);
                //     toast.success('User updated!');
                //     //TODO 여기에 메뉴리스트 부르는 함수를 넘겨받아서 호출해야지. 리스트 갱신해야하니까
                //     handleClose();
                // }
            } catch (err) {
                // console.error(err);
                // toast.error('Something went wrong!');
                // helpers.setStatus({ success: false });
                // helpers.setErrors({ submit: err.message });
                // helpers.setSubmitting(false);
            }
        }
    })

    const handleBoardCheck = (e:any) => {
        setBoard(e.target.checked);
    }

    const handleDashboardCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDashBoard(e.target.checked);
    }
    
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    메뉴명
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <TextField
                                fullWidth
                                name="menuName"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.menuName}
                               />
                            </Grid>
                            
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    상위메뉴
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <TextField
                                 name="parentMenu"
                                 required
                                 select
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.parentMenu}
                                 sx={{width:250}}
                               >
                                {/* TODO 추후에 데이터받아와서 넣어주기 */}
                                    <MenuItem value={0}>111111</MenuItem>
                                    <MenuItem value={2}>222222</MenuItem>
                                    <MenuItem value={3}>333333</MenuItem>
                               </TextField>
                            </Grid>

                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    정렬
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <TextField
                                 name="menuSort"
                                 required
                                 select
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.menuSort}
                                 sx={{width:250}}
                               >
                                {/* TODO 추후에 데이터 받아와서 넣어주기 */}
                                    <MenuItem value={0}>1111111</MenuItem>
                                    <MenuItem value={2}>2222222</MenuItem>
                                    <MenuItem value={3}>3333333</MenuItem>
                               </TextField>
                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    권한
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <TextField
                                 name="menuAuthority"
                                 required
                                 select
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 value={formik.values.menuAuthority}
                                 sx={{width:250}}
                               >
                                {/* TODO 추후에 데이터 받아와서 넣어주기 */}
                                    <MenuItem value={0}>1111111</MenuItem>
                                    <MenuItem value={2}>2222222</MenuItem>
                                    <MenuItem value={3}>3333333</MenuItem>
                               </TextField>
                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    컨텐츠
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               {/* <TextField
                                    fullWidth
                               >
                               </TextField> */}
                               <FormControlLabel 
                                control={<Checkbox value={formik.values.none} 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                 />} label="none" />
                               <FormControlLabel control={<Checkbox value={board} onChange={handleBoardCheck} />} label="board" />
                               {
                                    board && 
                                    <TextField 
                                    select
                                    name="board"
                                    value={1}
                                    sx={{mx:2}}
                               >
                                    <MenuItem value={1}>11111</MenuItem>
                                    <MenuItem value={2}>22222</MenuItem>
                                    <MenuItem value={3}>33333</MenuItem>
                                    {/* TODO 추후 Board 목록? 이거이해잘 안감. 어떻게 동작되는지. */}
                                    {
                                        
                                    }
                               </TextField>
                               }
                               
                               <FormControlLabel control={<Checkbox onBlur={formik.handleBlur}
                                value={formik.values.dashboard} onChange={handleDashboardCheck} />} label="dashboard" />
                               {
                                    dashboard &&
                                    <TextField 
                                    select
                                    value={1}
                                    sx={{mx:2}}
                                    name="dashboard"
                                    >
                                    <MenuItem value={1}>11111</MenuItem>
                                    <MenuItem value={2}>22222</MenuItem>
                                    <MenuItem value={3}>33333</MenuItem>
                                    {/* TODO 추후 Board 목록? 이거이해잘 안감. 어떻게 동작되는지. */}
                                    {
                                        
                                    }
                                    </TextField>
                               }
                               

                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    설명
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <TextField
                                fullWidth
                                name="menuDescription"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.menuDescription}
                                // label="메뉴명"
                               >
                               </TextField>
                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{display:"flex"}}
                            >
                               <Typography sx={{whiteSpace:'nowrap',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    public
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                               <FormControlLabel control={<Checkbox name="public" value={formik.values.menuPublic} onChange={formik.handleChange} onBlur={formik.handleBlur}/>} label="" />
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                sx={{textAlign:'center'}}
                            >
                                <Button type="submit" sx={{m:2}} variant='contained'>수정</Button>
                                <Button onClick={handleClose} variant='contained'>취소</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default MenuEditForm;