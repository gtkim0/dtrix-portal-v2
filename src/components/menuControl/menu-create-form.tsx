import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {
    Box,
    Container,
    Card,
    Divider,
    Grid,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Autocomplete
} from '@mui/material';
import {useFormik} from "formik";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';


interface IMenuCreateFormProps {
    handleClose: any;
}

const MenuCreateForm:FC<IMenuCreateFormProps> = (props) => {

    const {handleClose} = props;
    const [board,setBoard] = useState(false);
    const [dashboard, setDashBoard] = useState(false);

    const [inputValue,setInputValue] = useState<string>('');

    const options1 = ["1",'2',"3","4","5"];
    const options2 = ["1",'2',"3","4","5"];



    const formik = useFormik({
        initialValues: {
            menuName:'',        //메뉴 이름
            parentMenu:0,       //상위 메뉴
            menuSort:'',        //메뉴 정렬 
            menuAuthority:'',   //권한 설정
            
            none:false,
            board:'',
            dashboard:'',
            menuDescription:'',
            menuPublic:true
        },
        onSubmit: async (values, helpers):Promise<void> => {
            try {

            } catch (err) {

            }
        }
    })

    const handleBoardCheck = (e:any) => {
        setBoard(e.target.checked);
    }

    const handleDashboardCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDashBoard(e.target.checked);
    }


    useEffect(()=> {
        // TODO 데이터 받아오는 부분 처리해야함.
        // board 컨텐츠에 불러올 내용
        // dashboard 컨텐츠에 불러올 내용
        // 상위 메뉴리스트 목록 불러올 api

    },[])

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
                                    <MenuItem value={0}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
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
                                    <MenuItem value={0}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
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
                                sx={{display:'flex'}}
                                md={10}
                                xs={12}
                            >
                                <Autocomplete
                                    value={formik.values.menuAuthority}
                                    onChange={formik.handleChange}
                                    options={options1}
                                    onInputChange={(e,newInputValue)=> {
                                        setInputValue(newInputValue);
                                    }}

                                    inputValue={inputValue}
                                    sx={{width:250}}
                                    renderInput={(params)=>
                                        <TextField {...params} label={"그룹 추가"} />
                                    }
                                />

                                <Autocomplete
                                    value={formik.values.menuAuthority}
                                    onChange={formik.handleChange}
                                    options={options2}
                                    onInputChange={(e,newInputValue)=> {
                                        setInputValue(newInputValue);
                                    }}

                                    inputValue={inputValue}
                                    sx={{width:250,ml:3}}
                                    renderInput={(params)=>
                                        <TextField {...params} label={"사용자 추가"} />
                                    }
                                />


                                
                            </Grid>

                            <Grid
                                item
                                md={12}
                                xs={12}
                            >


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
                                <Button sx={{m:2}} variant='contained'>생성</Button>
                                <Button onClick={handleClose} variant='contained'>취소</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default MenuCreateForm;