import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminPosting.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import _ from "lodash";
import {FaPlus, FaTimes} from "react-icons/fa";
import {addBranch} from "../../../store/actions/CreatingActions";
import {fetchBranches, fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";
import Layout from "../../../components/Layout";
import ReAdminPostingSizeCreator from "./ReAdminPostingSizeCreator";
import ReAdminPostingBranchSize from "./ReAdminPostingBranchSize";
const ReAdminPosting = () => {
    const dispatch = useAppDispatch()
    const [current, setCurrent] = useState<number>(1)
    const {items, branches} = useAppSelector(state => state.itemReducer)
    const [createBranch, setCreateBranch] = useState<boolean>(false)
    const [createBranchValue, setCreateBranchValue] = useState<string>('')

    useEffect(() => {
        dispatch(fetchBranches())
        dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
    },[createBranch])

    return (
        <div className={classes['ReAdminPosting']}>
            <div className={classes['ReAdminPosting__header']}>
                {branches.length > 0 && branches.map((i, idx) =>
                    <div className={current === i.id ? classes['ReAdminPosting__header-item'] + ' ' + classes['active'] :
                        classes['ReAdminPosting__header-item']}
                         onClick={() => setCurrent(i.id)}
                         key={idx}
                    >
                        {i.name}
                    </div>
                )}
                {createBranch ?
                    <div className={classes['ReAdminPosting__header-item-create']} onClick={() => {}}>
                        <input type="text" value={createBranchValue} onChange={i => setCreateBranchValue(i.currentTarget.value)}/>
                        <div className={classes['ReAdminPosting__header-item-create-icon']}
                             onClick={ async () => {
                                 await dispatch(addBranch(createBranchValue))
                                 setCreateBranch(false)
                                 setCreateBranchValue('')
                                 await dispatch(fetchBranches())
                             }}>
                            <FaPlus/>
                        </div>
                        <div className={classes['ReAdminPosting__header-item-create-icon']}
                             onClick={() => {
                                 setCreateBranch(false)
                                 setCreateBranchValue('')
                             }}>
                            <FaTimes/>
                        </div>
                    </div>
                    :
                    <div className={classes['ReAdminPosting__header-item']} onClick={() => setCreateBranch(true)}>
                        +
                    </div>
                }
            </div>
            <Layout>
                <div className={classes['ReAdminPosting__branch']}>
                    {items.rows.map(i =>
                        <div key={i.id} className={classes['ReAdminPosting__branch-item']}>
                            <div className={classes['ReAdminPosting__branch-item-name']}>
                                {i.name}
                            </div>
                            <div className={classes['ReAdminPosting__branch-item-sizes']}>
                                {_.filter(i.sizes, o => o["branchId"] === current).map(l =>
                                    <div key={l.id}>
                                        <ReAdminPostingBranchSize size={l} purchase={i.purchase} branchId={current}/>
                                    </div>
                                )}
                                <ReAdminPostingSizeCreator itemId={i.id} branchId={current} purchase={i.purchase}/>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default ReAdminPosting;