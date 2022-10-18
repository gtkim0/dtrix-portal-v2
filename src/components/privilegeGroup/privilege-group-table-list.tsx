import React, {useEffect, useState, useCallback} from 'react';
import type {FC} from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import {useFormik} from "formik";
import * as Yup from "yup";
import { privilegeApi } from '../../apis/privilege-api';
import { dateFormat } from '../../utils/date-formatter';
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
//   ul.pagination li.disabled {display : none;}

interface PrivilegeGroupTableListProps {
    page: number;
    size: number;
    total: number;
    dataList: Array<any>;
    detailPrivilegeCheck :boolean;
    onPageChange : any;
    onSizeChange : any;
    onCallbackId : any;
    selectPrivilete? : any;
    successCallback :any;
    onCloseDetailPrivilege : any;
    checkSelectedListLength : any;
}

const PrivilegeGroupTableList:FC<PrivilegeGroupTableListProps> = (props) => {

 
    const {page, size, total, dataList ,onPageChange , successCallback, detailPrivilegeCheck , onSizeChange,onCallbackId,onCloseDetailPrivilege, checkSelectedListLength} = props;
    console.log(dataList);
    const [selectedList, setSelectedList] = useState<number[]>([]);
    const [allCheckStatus, setAllCheckStatus] = useState<boolean>(false);
    const [addCheck,setAddCheck] = useState<boolean>(false);

    const [privilegeName,setPrivilegeName] = useState('');

    
    const handleCheckChange = (e:React.ChangeEvent<HTMLInputElement>,id:number) => {
        let list = [...selectedList];
        if(!list.includes(id)) {
            list = [...list].concat(id);
        }else{
            list = [...list].filter((data=> data!==id))
        }
        setSelectedList([...list]);
        checkSelectedListLength([...list].length)
    }

    const handleAllCheckChange = () => {
        setAllCheckStatus(prev=>!prev);
    }

    const handleCodeClick = (e:React.MouseEvent<HTMLElement>, id:number) => {
        onCallbackId(id);
    }

    const handleDeletePrivilege = async() => {
        if(selectedList.length === 0) {
            alert('삭제할 항목을 선택하세요.');
        }

        console.log(selectedList);
        // TODO Delete 할때 리스트 넣어야함
        try {
            // const result = await privilegeApi.deletePrivilege()
        } catch (err) {

        }
    }

    const handleSavePrivilege = useCallback(async ()=> {

        if(privilegeName==="") {
            alert("이름을 입력해주세요");
            return ;
        }

        try {
            const result = await privilegeApi.createPrivilege({privilegeName:privilegeName, delYn:false});
            setPrivilegeName('');
            setAddCheck(false);
            successCallback();
        } catch (err) {
            console.error(err);
        }
    },[privilegeName])

    const handleAddPrivilege = (e:any) => {
        setPrivilegeName(e.target.value);
    }

    useEffect(()=> {
        if(allCheckStatus) {
            let list:number[] = [];
            dataList.map((data)=> {
                list.push(data.privilegeId);
            })
            setSelectedList([...list]);
            checkSelectedListLength([...list].length)
        }else{
            setSelectedList([]);
            checkSelectedListLength(0)
        }
    },[allCheckStatus])

    if( !dataList) {
        return null;
    }

    return (
        <>
            <div className="bg-gray-300 p-4 flex justify-between">
                    <div className="mx-2">
                        <label>
                            사용여부
                        </label>
                        <select className='w-32 mx-4 h-8' >
                            <option value="">전체</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="relative w-96 flex">
                        <input placeholder='검색 내용을 입력하세요' className="h-8 w-80 px-3"/>
                        <button className="px-4 bg-gray-500 text-white">검색</button>
                    </div>
                    <div>
                        <button onClick={()=> {setAddCheck(prev=>!prev)}} className="py-1 px-3 mx-3 bg-gray-500 text-white">추가</button>
                        <button onClick={handleSavePrivilege}  className="py-1 px-3 mx-3 bg-gray-500 text-white">저장</button>
                        <button onClick={handleDeletePrivilege} className="py-1 px-3 mx-3 bg-gray-500 text-white">삭제</button>
                    </div>
            </div>
            <table className="w-full border-collapse border-2 mt-10">
                <thead className="bg-gray-300">
                    <tr>
                        <td className='p-2 w-10 mx-auto text-center'><input type="checkbox" onChange={(e)=>handleAllCheckChange()} /></td>
                        <td className="p-2 w-20 border-2 text-center">id</td>
                        <td className="p-2 border-2 text-center">이름</td>
                        <td className="p-2 border-2 text-center">생성일</td>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((data)=>(
                        <tr className="border-2" key={data.privilegeId}>
                            <td className="p-2 w-10 border-2 text-center"><input type="checkbox" onChange={(e)=>handleCheckChange(e,data.privilegeId)} checked={selectedList.includes(data.privilegeId)}/></td>
                            <td className="p-2 w-20 border-2 text-center">{data.privilegeId}</td>
                            <td onClick={(e)=>handleCodeClick(e,data.privilegeId)} className="p-2 w-240 border-2 text-center cursor-pointer">{data.privilegeName}</td>
                            <td className="p-2 w-120 border-2 text-center">{dateFormat(data.createdAt)}</td>
                        </tr>
                    ))}
                    {
                        addCheck &&
                            <tr className="bg-gray-400">
                                <td className="p-2 w-10 mx-auto"></td>
                                <td className="w-20 border-2 p-2 text-center border-none"></td>
                                <td className="border-2 p-2 w-240 text-center"><input className='w-full' onChange={handleAddPrivilege} name="privilegeName" value={privilegeName}/></td>
                                <td className="p-2 w-120 border-2 text-center m-0"></td>
                            </tr>
                    }
                </tbody>
            </table>
            <div>
                <PaginationBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        prevPageText = {"‹"}
                        nextPageText={"›"}
                        onChange={onPageChange}
                    />
                </PaginationBox>
                {
                    detailPrivilegeCheck && <button onClick={onCloseDetailPrivilege} className="float-right bg-gray-500 w-10">x</button>
                }
                
            </div>
        </>
    )
}

export default PrivilegeGroupTableList;

