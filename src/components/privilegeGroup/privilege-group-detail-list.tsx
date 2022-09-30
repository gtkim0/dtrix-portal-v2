import React, {useState, useEffect, useCallback} from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components'
import type {FC} from 'react'
import { privilegeUserDetailApi } from '../../apis/privilege-group-detail';

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

interface IParamsProps  {
    page:number;
    size:number;
    total:number;
    list :[]  // result type 적어야함.
}  

interface IPrivilegeGroupDetailListProps {
    detailPrivilegeId : number;
}

const PrivilegeGroupDetailList:FC<IPrivilegeGroupDetailListProps> = (props) => {

    const { detailPrivilegeId } = props;
    const [privilegeUser, setPrivilegeUser] = useState<any>();
    const [selectedList, setSelectedList] = useState<number[]>([]);
    const [allCheckStatus, setAllCheckStatus] = useState<boolean>(false);

    const [pagingDetailValue, setPagingDetailValue] = useState<IParamsProps>({
        page:0,
        size:20,
        total:0,
        list:[]
    })
    const {page,size,total,list} = pagingDetailValue;

    const handlePageChange = () => {

    }

    const handleAllCheckChange = () => {
        setAllCheckStatus(prev=>!prev);
    }

    const getPrivilegeUser = useCallback( async (detailPrivilegeId:any)=> {
        console.log(detailPrivilegeId);
        try {
            const result = await privilegeUserDetailApi.getPrivilegeUsers(detailPrivilegeId);
            const {data} = result;
            if(data) {
                setPrivilegeUser(data.list);
            }
        } catch (err){
            console.error(err);
        }
    },[])

    const handleCheckChange = (e:React.ChangeEvent<HTMLInputElement>,id:number) => {
        let list = [...selectedList];
        if(!list.includes(id)) {
            list = [...list].concat(id);
        }else{
            list = [...list].filter((data=> data!==id))
        }
        setSelectedList([...list]);
    }

    useEffect(()=> {
        if(detailPrivilegeId && Number(detailPrivilegeId) !==0)
            getPrivilegeUser(detailPrivilegeId)
    },[detailPrivilegeId])


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

    console.log(privilegeUser);

    if(!privilegeUser) {
        return <></>;
    }

    return (
        <>
            <table className="w-full border-collapse border-2">
                <thead className="bg-gray-300">
                    <tr>
                        <td className='p-2 w-10 mx-auto text-center'><input type="checkbox" onChange={(e)=>handleAllCheckChange()} /></td>
                        <td className="p-2 w-20 border-2 text-center">번호</td>
                        <td className="p-2 border-2 text-center">코드</td>
                        <td className="p-2 border-2 text-center">그룹</td>
                    </tr>
                </thead>
                <tbody>
                    {privilegeUser.map((data:any)=>(
                        <tr className="border-2" key={data.uprId}>
                            <td className="p-2 border-2 text-center"><input type="checkbox" onChange={(e)=>handleCheckChange(e,data.uprId)} checked={selectedList.includes(data.uprId)}/></td>
                            <td className="p-2 border-2 text-center">{data.userId}</td>
                            <td className="p-2 border-2 text-center">{data.userLoginId}</td>
                            <td className="p-2 border-2 text-center">{data.userName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {/* <PaginationBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}  //total 값 넘겨야하고
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handlePageChange}
                    />
                </PaginationBox> */}
            </div>
        </>
    )
}

export default PrivilegeGroupDetailList;



const dummyData = [
    {
        id:1,
        no:1,
        code:"Auth0000",
        group:'영업'
    },
    {
        id:2,
        no:2,
        code:"board0000",
        group:'영업'
    },
    {
        id:3,
        no:3,
        code:"dash0000",
        group:'영업'
    },
    {
        id:4,
        no:4,
        code:"read0000",
        group:'영업'
    },
    {
        id:5,
        no:5,
        code:"Auth0000",
        group:'영업'
    },
]