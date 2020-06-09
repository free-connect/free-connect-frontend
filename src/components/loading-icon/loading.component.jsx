import React from 'react';
import './loading.styles.css'

export const Loading = () => {
    const [visible, setVisible] = React.useState(true)

    let nums = ['one', 'two', 'three', 'four', 'five']

    React.useEffect(() => document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'visible') {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, []))

    return(
        <div className='loading'>
            {visible ?
            new Array(5)
                    .fill(4)
                    .map((a,i) => a-i)
                    .map((b,i) => 
                        <div 
                            key={i} 
                            className={'ball '+nums[i]}
                            style={{
                                animationDelay: `.${i}s`,
                                animationName: 'slideOver'
                            }}
                            onAnimationEnd = {() => {
                                let ball = document.querySelector(`.loading div:nth-child(${i+1})`)
                                const check = getComputedStyle(ball);
                                ball.style.animationDelay = '0s'
                                ball.style.backgroundColor='rgb(109, 109, 233)'
                                ball.style.animationName = check.animationName === 'slideOver' ? 'slideBack' : 'slideOver'
                                            }}
                        >

                        </div>) :
                        null}
            </div>
    )
}