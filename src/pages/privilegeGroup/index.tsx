import React, { useState, ReactNode, useCallback, useEffect } from 'react';
import { privilegeApi } from '../../apis/privilege-api';
import Layout from "../../components/Layout/layout";
import PrivilegeGroupTableList from '../../components/privilegeGroup/privilege-group-table-list';
import { useGetPrivilegeQuery } from '../../store/sliceApi/privilegeGroup';
import PrivilegeGroupDetailList from '../../components/privilegeGroup/privilege-group-detail-list';
import CreatePrivilegeUserModal from '../../components/privilegeGroup/modal/create-privilege-user-modal';


interface IPrivilegeForm {
    privilegeName: string,
    delYn: boolean,
    createdAt: number,
    modifiedAt: number,
    privilegeId: number
}

interface IParamsProps {
    page: number;
    size: number;
}

interface IPagingProps {
    page: number;
    size: number;
}

const PrivilegeGroup = () => {
    // TODO 추후 rtk query 로 변경
    // const {data, refetch} = useGetPrivilegeQuery({page,size});

    const [detailPrivilegeCheck, setDetailPrivilegeCheck] = useState<boolean>(false);
    const [detailPrivilegeId, setDetailPrivilegeId] = useState<number>(0);
    const [selectedCheckListLength, setSelectedCheckListLength] = useState<number>(0);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const [pagingValue, setPagingValue] = useState<IParamsProps>({
        page: 0,
        size: 10
    })

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const { page, size } = pagingValue;

    const handlePageChange = (page: number) => {
        setPagingValue({
            ...pagingValue,
            page: page
        })
    }


    const handleSizeChange = (e: React.ChangeEvent<HTMLElement>) => {
    }

    const checkSelectedListLength = (e: any) => {
        setSelectedCheckListLength(e);
    }

    const handleCallbackId = (e: number) => {
        setDetailPrivilegeId(e)
    }

    const handleCloseDetailPrivilege = () => {
        setDetailPrivilegeCheck(false);
    }

    const handleClose = () => {
        setCreateModalOpen(false);
    }

    const getAutority = useCallback(async (params:IPagingProps) => {
        console.log(params);
        try {
            const result = await privilegeApi.getPrivileges(params);
            // const result = await privilegeApi.getPrivileges({page:0,size:10});
            if(result) {
                const {total, list} = result.data;
                setTotal(total);
                setList(list);
            }
        } catch (err) {
            console.error(err);
        }
    },[])

    const handleDeleteDetailUserPrivilege = useCallback(async()=> {
        try {
            // const result = await privilegeApi.get
        } catch (err) {
            
        }
    },[])

    const body = {
        page: page,
        size: size
    }
    // const { data, error, isLoading, refetch } = useGetPrivilegeQuery(body);

    const successCallback = () => {
        const params = {
            page: page,
            size: size
        }
    }

    useEffect(() => {
        const params = {
            page: page,
            size: size
        }
        getAutority(params);
    }, [page, size])



    return (
        <>
            {
                <div className='p-4'>
                    <div>
                        <PrivilegeGroupTableList
                            dataList={list}
                            page={page}
                            size={10}
                            total={total}
                            successCallback={successCallback}
                            detailPrivilegeCheck={detailPrivilegeCheck}
                            onCallbackId={handleCallbackId}
                            onPageChange={handlePageChange}
                            onSizeChange={handleSizeChange}
                            onCloseDetailPrivilege={handleCloseDetailPrivilege}
                            checkSelectedListLength={checkSelectedListLength}
                        />
                    </div>

                    <div className="w-full border-2 mt-5"></div>
                    {
                        detailPrivilegeId !== 0 &&
                        <div className="mt-10">
                            <div className="float-right">
                                <button onClick={() => setCreateModalOpen(true)} className="px-2 py-1 bg-gray-500 text-white m-1">추가</button>
                                <button onClick={handleDeleteDetailUserPrivilege} className="px-2 py-1 bg-gray-500 text-white m-1">삭제</button>
                            </div>
                            <PrivilegeGroupDetailList detailPrivilegeId={detailPrivilegeId} />
                        </div>
                    }
                </div>

            }
            {
                <CreatePrivilegeUserModal detailPrivilegeId={detailPrivilegeId} modalOpen={createModalOpen} handleClose={handleClose} />
            }
        </>
    )
}

PrivilegeGroup.getLayout = (page: ReactNode) => (
    <Layout>
        {page}
    </Layout>
)

export default PrivilegeGroup;