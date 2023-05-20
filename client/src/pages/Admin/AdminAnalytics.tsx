import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Admin/AdminAnalytics.module.scss'
import Layout from "../../components/Layout";
import {useAppDispatch, useAppSelector} from "../../store/redux";
// import {fetchExpenses, fetchBudget} from "../../store/actions/FetchingActions";
import UIInput from "../../UIKit/UIInput";
import UIInteraction from "../../UIKit/UIInteraction";
import {IoAdd} from "react-icons/io5";
import {createExpense} from "../../store/actions/CreatingActions";
import {FaTimes} from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";

const AdminAnalytics = () => {
    // const dispatch = useAppDispatch()
    // const {investment, cash, income, expenses} = useAppSelector(state => state.budgetReducer)
    // const [expensesSum, setExpensesSum] = useState<number>(0)
    // const [expensesUpdate, setExpensesUpdate] = useState<boolean>(false)
    // const [logs,setLogs] = useState<boolean>(false)
    // const [expensesName, setExpensesName] = useState<string>('')
    // const [expensesComment, setExpensesComment] = useState<string>('')
    // const [expensesNewSum, setExpensesNewSum] = useState<string>('')
    //
    // useEffect(() => {
    //     dispatch(fetchExpenses())
    //     dispatch(fetchBudget())
    // }, [])
    //
    // useEffect(() => {
    //     let localSum = 0
    //     for (let i in expenses) {
    //         localSum += expenses[i].sum
    //     }
    //     setExpensesSum(localSum)
    // }, [expenses])
    //
    //
    // const createExpenseHandler = async() => {
    //     dispatch(createExpense({
    //         name: expensesName,
    //         sum: expensesNewSum,
    //         comment: expensesComment
    //     }))
    //     setExpensesUpdate(false)
    //     setExpensesName('')
    //     setExpensesComment('')
    //     setExpensesNewSum('')
    //     await dispatch(fetchBudget())
    //     await dispatch(fetchExpenses())
    // }

    return (
        <div className={classes['AdminAnalytics']}>
            {/*<Layout>*/}
            {/*    <div className={classes['AdminAnalytics-budget']}>*/}
            {/*        <div className={classes['AdminAnalytics-budget-item']}>*/}
            {/*            Инвестиции: <span>{investment.toLocaleString('ru')} ₽</span>*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminAnalytics-budget-item']}>*/}
            {/*            Выручка: <span>{income.toLocaleString('ru')} ₽</span>*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminAnalytics-budget-item']}>*/}
            {/*            Касса: <span>{cash.toLocaleString('ru')} ₽</span>*/}
            {/*        </div>*/}

            {/*        <div className={classes['AdminAnalytics-budget-item-expenses']}>*/}
            {/*            <div className={classes['AdminAnalytics-budget-item-expenses-title']}>*/}
            {/*                Расходы:*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminAnalytics-budget-item-expenses-value']}>*/}
            {/*                <span>{expensesSum.toLocaleString('ru')} ₽</span>*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminAnalytics-budget-item-expenses-add']}*/}
            {/*                 onClick={() => setLogs(!logs)}*/}
            {/*            >*/}
            {/*                <AiOutlineEye/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        {logs &&*/}
            {/*            <div className={classes['AdminAnalytics-budget-item-logs']}>*/}
            {/*                <div className={classes['AdminAnalytics-budget-item-logs-cross']} onClick={() => setLogs(!logs)}>*/}
            {/*                    <FaTimes/>*/}
            {/*                </div>*/}
            {/*                <div className={classes['AdminAnalytics-budget-item-logs-container']}>*/}
            {/*                    {expensesUpdate ?*/}
            {/*                        <div>*/}
            {/*                            <UIInput type={'string'} setValue={setExpensesName} value={expensesName}>Лицо</UIInput>*/}
            {/*                            <UIInput type={'string'} setValue={setExpensesNewSum} value={expensesNewSum}>Сумма</UIInput>*/}
            {/*                            <UIInput type={'string'} setValue={setExpensesComment} value={expensesComment}>Комментарий</UIInput>*/}
            {/*                            <UIInteraction onClick={() => createExpenseHandler()}> <IoAdd/></UIInteraction>*/}
            {/*                            <UIInteraction onClick={() => setExpensesUpdate(!expensesUpdate)}><FaTimes/></UIInteraction>*/}
            {/*                        </div>*/}
            {/*                        :*/}
            {/*                        <UIInteraction onClick={() => setExpensesUpdate(!expensesUpdate)}>*/}
            {/*                            <IoAdd/>*/}
            {/*                        </UIInteraction>*/}
            {/*                    }*/}
            {/*                    {expenses.map(i =>*/}
            {/*                        <div>*/}
            {/*                            {Number(i.sum).toLocaleString('ru')} ₽ - {i.name} - {i.comment}*/}
            {/*                        </div>*/}
            {/*                    )}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</Layout>*/}
        </div>
    );
};

export default AdminAnalytics;