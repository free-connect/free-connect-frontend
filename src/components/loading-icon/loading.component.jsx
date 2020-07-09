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

    const changeFunction = (index) => {
        let ball = document.querySelector(`.loading div:nth-child(${index + 1})`)
        const check = getComputedStyle(ball);
        ball.style.animationDelay = '0s'
        ball.style.backgroundColor = 'rgb(109, 109, 233)'
        ball.style.animationName = check.animationName === 'slideOver' ? 'slideBack' : 'slideOver'
    }

    return (
        <div className='loading'>
            {visible ?
                new Array(5)
                    .fill(4)
                    .map((a, i) => a - i)
                    .map((b, i) =>
                        <div
                            key={i}
                            className={'ball ' + nums[i]}
                            onAnimationEnd={() => changeFunction(i)}
                        >
                        </div>) :
                null}
        </div>
    )
}