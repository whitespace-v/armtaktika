import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {fetchBranch, fetchBranches, fetchExpenses} from "../../../store/actions/FetchingActions";
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminAnalytics.module.scss'
import Layout from "../../../components/Layout";
import {createExpense} from "../../../store/actions/CreatingActions";

const ReAdminAnalytics = () => {
    const dispatch = useAppDispatch()
    const { branch, branches } = useAppSelector(state => state.itemReducer)
    const {expenses} = useAppSelector(state => state.budgetReducer)
    const [branchId, setBranchId] = useState<number>(1)
    const [create, setCreate] = useState<boolean>(false)

    const [expenseSum, setExpenseSum] = useState<string>('0')
    const [expenseName, setExpenseName] = useState<string>('')
    const [expenseDate, setExpenseDate] = useState<string>('')

    useEffect(() => {
        let today = new Date()
        setExpenseDate(today.toJSON().slice(0,10).split('-').reverse().join('.'))
        dispatch(fetchBranch(branchId))
        dispatch(fetchBranches())
        dispatch(fetchExpenses(branchId))
    }, [branchId])

    const createExpenseHandler = async() => {
        setCreate(false)
        await dispatch(createExpense({branchId, expenseSum, expenseName, expenseDate}))
        setExpenseSum('0')
        setExpenseName('')
        await dispatch(fetchExpenses(branchId))
        await dispatch(fetchBranch(branchId))
    }
    return (
        <div className={classes['ReAdminAnalytics']}>
            <div className={classes['ReAdminAnalytics__header']}>
                {branches.length > 0 && branches.map((i, idx) =>
                    <div className={branchId === i.id ? classes['ReAdminAnalytics__header-item'] + ' ' + classes['active'] :
                        classes['ReAdminAnalytics__header-item']} key={idx} onClick={() => setBranchId(i.id)}
                    >
                        {i.name}
                    </div>
                )}
            </div>
            <Layout>
                <div className={classes['ReAdminAnalytics__branch']}>
                    Инвестиции в товар: {branch.investment} <br/>
                    Касса: {branch.cash} <br/>
                    Выручка: {branch.income} <br/>
                    Чистая прибыль: {branch.profit}
                </div>
                <div className={classes['ReAdminAnalytics__expenses']}>
                    <div className={classes['ReAdminAnalytics__expenses-title']}>
                        Расходы
                    </div>
                    {create ?
                        <div className={classes['ReAdminAnalytics__expenses-create']}>
                            <div className={classes['ReAdminAnalytics__expenses-create-block']}>
                                Дата
                                <input type="text" value={expenseDate} onChange={i => setExpenseDate(i.currentTarget.value)}/>
                            </div>
                            <div className={classes['ReAdminAnalytics__expenses-create-block']}>
                                Сумма
                                <input type="text" value={expenseSum} onChange={i => setExpenseSum(i.currentTarget.value)}/>
                            </div>
                            <div className={classes['ReAdminAnalytics__expenses-create-block']}>
                                Комментарий
                                <input type="text" value={expenseName} onChange={i => setExpenseName(i.currentTarget.value)}/>
                            </div>
                            <div className={classes['ReAdminAnalytics__expenses-create-buttons']}>
                                <div className={classes['ReAdminAnalytics__expenses-create-buttons-item']}
                                     onClick={() => setCreate(false)}
                                >
                                    Отменить
                                </div>
                                <div className={classes['ReAdminAnalytics__expenses-create-buttons-item']}
                                     onClick={() => createExpenseHandler()}
                                >
                                    Добавить
                                </div>
                            </div>
                        </div>
                        :
                        <div className={classes['ReAdminAnalytics__expenses-add']}
                             onClick={() => setCreate(true)}
                        >
                            + Добавить расход
                        </div>
                    }
                    <div className={classes['ReAdminAnalytics__expenses-items']}>
                        {expenses.map(i =>
                            <div className={classes['ReAdminAnalytics__expenses-items-item']} key={i.id}>
                                {i.date} - {i.sum} - {i.name}
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default ReAdminAnalytics;