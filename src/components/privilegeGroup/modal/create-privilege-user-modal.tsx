import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, PaperProps } from '@mui/material';
import Draggable from 'react-draggable';
import Pagination from 'react-js-pagination';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import {userApi} from "../../../apis/user-api";
import type {User} from '../../../types/user';
import { privilegeUserDetailApi } from '../../../apis/privilege-group-detail';
interface ICreatePrivilegeUserModalProps {
    modalOpen :boolean;
    handleClose :any;
    detailPrivilegeId :any;
}

const CreatePrivilegeUserModal: FC<ICreatePrivilegeUserModalProps> = (props) => {

    const {modalOpen, handleClose, detailPrivilegeId} = props;
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);

    const [allCheckStatus, setAllCheckStatus] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<number[]>([]);

    const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllCheckStatus(prev => !prev);
    }

    const handleCheckChange = (e:React.ChangeEvent<HTMLInputElement>,id:number) => {
        let list = [...selectedList];
        if(!list.includes(id)) {
            list = [...list].concat(id);
        }else{
            list = [...list].filter((data=> data!==id))
        }
        setSelectedList([...list]);
    }

    function PaperComponent(props: PaperProps) {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...props} />
            </Draggable>
        );
    }

    const handlePageChange = (e:any) => {
        // setPaging({
        //     ...paging,
        //     size:e.target.value;
        // })
    }

    const getUsers = useCallback(async (params: any) => {
        try {
            const result = await userApi.getUsers(params);
            
            // @ts-ignore
            const {total, list} = result.data;
            console.log(list);
            if (result) {
                setTotal(total);
                setUsers(list);
            }
        } catch (err) {
            console.error(err);
        }
    }, [])

    const handleAddPrivilege = async () => {
        if(selectedList.length === 0) {
            alert("추가할 유저를 선택하세요");
        }
        let list:any = [];
        selectedList.map((data)=> {
            list.push({
                userId : data,
                privilegeId : detailPrivilegeId
            })
        })

        privil(list);
    }

    const privil = async (list:any) => {
        const params = {
            page:page,
            size:size
        }


        try {
            const result = await privilegeUserDetailApi.createPrivilegeUsers(list);
            setSelectedList([]);
            handleClose();
            
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const params = {
            page: page,
            size: size,
            // TODO 아직 구현 안된상황, 정렬부분이랑 사이트 네임부분 구현필요
        }
        getUsers(params);
    }, [page, size])

    useEffect(()=> {
        if(allCheckStatus) {
            let list:number[] = [];
            users.map((data)=> {
                list.push(data.userId);
            })
            setSelectedList([...list]);
        }else{
            setSelectedList([]);
        }
    },[allCheckStatus])



    return (
        <>
            <div>

                <Dialog
                    open={modalOpen}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    maxWidth="lg"
                >
                    <div className="p-5 bg-gray-100 flex flex-col" id="draggable-dialog-title">
                        <div>
                            <button onClick={handleAddPrivilege} className="px-1 py-1 mb-2 bg-gray-400 text-white float-left">
                                선택
                            </button>
                            <button onClick={handleClose} className='px-2 py-2 mb-2 bg-gray-700 text-white float-right w-8 h-8 flex justify-center items-center'>
                                <CloseIcon />
                            </button>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr className="bg-gray-300">
                                        <th className="p-2 text-center"><input type="checkbox" checked={allCheckStatus} onChange={handleAllChange} /></th>
                                        <th className="p-2 w-60 text-center">아이디</th>
                                        <th className="p-2 w-60 text-center">이름</th>
                                        <th className="p-2 w-60 text-center">권한</th>
                                        <th className="p-2 w-60 text-center">직급</th>
                                    </tr>
                                </thead>
                                <tbody className=" border-gray-700">
                                    {
                                        users.map((data:any) => (
                                            <tr key={data.userId} className="border-2">
                                                <td className="p-2 border-1 text-center"><input type="checkbox" onChange={(e)=>handleCheckChange(e,data.userId)} checked={selectedList.includes(data.userId)} /></td>
                                                <td className="p-2 border-1 text-center">{data.userId}</td>
                                                <td className="p-2 border-1 text-center">{data.userName}</td>
                                                <td className="p-2 border-1 text-center">{data.roleName}</td>
                                                <td className="p-2 border-1 text-center">{data.positionName}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <PaginationBox>
                            <Pagination
                                activePage={1}
                                itemsCountPerPage={10}
                                totalItemsCount={10}  //total 값 넘겨야하고
                                pageRangeDisplayed={10}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={handlePageChange}
                            />
                        </PaginationBox>
                    </div>
                </Dialog>

            </div>
        </>
    )
}

export default CreatePrivilegeUserModal;


const dummyData = [
    {
        id:1,
        no:10,
        a:"a",
        b:"b"
    },
    {
        id:2,
        no:10,
        a:"a",
        b:"b"
    },
    {
        id:3,
        no:10,
        a:"a",
        b:"b"
    },
    {
        id:4,
        no:10,
        a:"a",
        b:"b"
    },
]


const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #337ab7; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: blue; }
  `