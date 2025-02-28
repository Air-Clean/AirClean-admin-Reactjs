import './RevenueBoxCSS.css'
import { useEffect, useState } from 'react';
import RevenuePie from './RevenuePie';
import RevenueGraph from './RevenueGraph';
import AnimatedNumbers from "react-animated-numbers";
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { callRevenueApi } from '../../../apis/MainAPICalls';
import Loading from '../../../common/LoadingSpinner';

export default function RevenueBox({ com, firm }) {
    const dispatch = useDispatch();

    const [month, setMonth] = useState('');
    const [maxMonth, setMaxMonth] = useState('');

    const selectMonth = e => {
        setMonth(e.target.value);
    }

    useEffect(() => {
        const today = new Date();
        const defaultMonth = today.toISOString().slice(0, 7);
        setMaxMonth(defaultMonth);
        setMonth(defaultMonth);
        
    }, []);

    useEffect(() => {
        if (month) {
            dispatch(callRevenueApi({ com: com, month: month }));
        }
    }, [dispatch, com, month]);

    const revenue = useSelector(state => state.revenueReducer);
    const [monthRevenue, setMonthRevenue] = useState(0);
    const [annualRevenue, setAnnualRevenue] = useState(0);

    useEffect(() => {
        setMonthRevenue(revenue?.monthRevenue || 0);
        setAnnualRevenue(revenue?.annual || 0);
    }, [revenue]);

    const monthHandler = () => {
        dispatch(callRevenueApi({ com: com, month: month }));
    }

    const yearHandler = () => {
        // 연 수익을 가져오는 API 호출 구현 필요

        
    }

    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    if (month) {
        setIsLoading(true);  // API 호출 전에 로딩 상태로 설정
        dispatch(callRevenueApi({ com: com, month: month })).then(() => {
            setIsLoading(false);  // API 호출이 끝나면 로딩 상태 해제
        });
    }
}, [dispatch, com, month]);

useEffect(() => {
    console.log("Month Revenue:", revenue?.monthRevenue);
    console.log("Annual Revenue:", revenue?.annual);
    setMonthRevenue(revenue?.monthRevenue || 0);
    setAnnualRevenue(revenue?.annual || 0);
}, [revenue]);


    return (
        <div className='revenueContainer'>
            {isLoading ? (<Loading/>) : (
                <>
                <div className='title' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='titleBox'>Revenue</div>
                <input 
                    type="month"
                    value={month}
                    max={maxMonth}
                    onChange={selectMonth}
                />
            </div>
            <div className='month' onClick={monthHandler}>
                <div className='revenueButton animate__animated'>
                    <div className='buttonTitle'>Month Revenue</div>
                    <div style={{ display: 'flex' }} className='money'>
                        <FontAwesomeIcon icon={faWonSign} />
                        <AnimatedNumbers
                            includeComma
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index * 0.1,
                            })}
                            animateToNumber={monthRevenue}
                            fontStyle={{
                                fontSize: 40,
                                color: "white",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='year' onClick={yearHandler}>
                <div className='revenueButton' style={{ display: 'flex' }}>
                    <div className='buttonTitle'>Annual Revenue</div>
                    <div style={{ display: 'flex' }} className='money'>
                        <FontAwesomeIcon icon={faWonSign} />
                        <AnimatedNumbers
                            includeComma
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index * 0.1,
                            })}
                            animateToNumber={annualRevenue}
                            fontStyle={{
                                fontSize: 40,
                                color: "white",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='revenuePie' id='revenuePie'>
                <RevenuePie revenue={revenue} com={com}/>
            </div>
            <div className='revenueGraph'>
                <RevenueGraph revenue={revenue} selectMonth={month}/>
            </div>
                </>
            )}
            
        </div>
    )
}
