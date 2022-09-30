import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, PaperProps } from '@mui/material';
import Draggable from 'react-draggable';
import Pagination from 'react-js-pagination';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
interface ICreatePrivilegeUserModalProps {
    modalOpen :boolean;
    handleClose :any;
}

const CreatePrivilegeUserModal: FC<ICreatePrivilegeUserModalProps> = (props) => {

    const {modalOpen, handleClose} = props;
    const [open, setOpen] = useState(false);
 

    const [paging, setPaging] = useState({
        page:0,
        size:10,
        total:0
    })


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

    useEffect(()=> {
        if(allCheckStatus) {
            let list:number[] = [];
            dummyData.map((data)=> {
                list.push(data.id);
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
                    <div className="p-5 bg-gray-200 flex flex-col" id="draggable-dialog-title">
                        <div>
                            <button onClick={handleClose} className='px-2 py-2 mb-2 bg-gray-700 text-white float-right'>
                                <CloseIcon />
                            </button>
                        </div>
                        <div>
                            <table className="border-collapse border-2">
                                <thead>
                                    <tr className="bg-gray-300 border-2">
                                        <td className="p-2 border-2 text-center"><input type="checkbox" checked={allCheckStatus} onChange={handleAllChange} /></td>
                                        <td className="p-2 border-2 w-60 text-center">번호</td>
                                        <td className="p-2 border-2 w-60 text-center">권한</td>
                                        <td className="p-2 border-2 w-60 text-center">직급</td>
                                        <td className="p-2 border-2 w-60 text-center">사용여부</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dummyData.map((data:any) => (
                                            <tr key={data.id} className="border-2">
                                                <td className="p-2 border-2 text-center"><input type="checkbox" onChange={(e)=>handleCheckChange(e,data.id)} checked={selectedList.includes(data.id)} /></td>
                                                <td className="p-2 border-2 text-center">{data.id}</td>
                                                <td className="p-2 border-2 text-center">{data.no}</td>
                                                <td className="p-2 border-2 text-center">{data.a}</td>
                                                <td className="p-2 border-2 text-center">{data.b}</td>
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