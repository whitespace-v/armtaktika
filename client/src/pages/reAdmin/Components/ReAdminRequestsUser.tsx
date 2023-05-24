import React, {useState} from 'react';
import {IOrder} from "../../../utils/models";
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminRequestsUser.module.scss'
const ReAdminRequestsUser = ({item}: {item: IOrder}) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div className={classes['ReAdminRequestsUser']}>
            {expanded ?
                <div className={classes['ReAdminRequestsUser-expanded']}>
                    <div className={classes['ReAdminRequestsUser-expanded-data']}>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            Имя: {item.name}
                        </div>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            Фамилия: {item.surname}
                        </div>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            Отчество: {item.patronymic}
                        </div>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            Номер телефона: {item.phone}
                        </div>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            Комментарий: {item.comment}
                        </div>
                        <div className={classes['ReAdminRequestsUser-expanded-data-item']}>
                            {item.deliveryMethod} {item.deliveryCity} {item.deliveryAddress}
                        </div>
                    </div>
                    <div className={classes['ReAdminRequestsUser-expanded-hide']}
                         onClick={() => setExpanded(false)}
                    >
                        Скрыть данные
                    </div>
                </div>
                :
                <div className={classes['ReAdminRequestsUser-button']}
                     onClick={() => setExpanded(true)}
                >
                    Показать данные
                </div>
            }
        </div>
    );
};

export default ReAdminRequestsUser;