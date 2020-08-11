import React from 'react';
import './loading.styles.scss';

export const Loading = () => {
    const [visible, setVisible] = React.useState(true);

    const handleVis = () => {
        if (document.visibilityState === 'visible') {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    React.useEffect(
        () => {
            document.addEventListener("visibilitychange", handleVis)
            return () => document.removeEventListener("visibilitychange", handleVis)
        })

    const changeFunction = (index) => {
        let ball = document.querySelector(`.loading div:nth-child(${index + 1})`)
        if (ball.className.includes('mod') || ball.className === 'ball ball-to') {
            ball.className = 'ball ball-fro';
        } else if (ball.className === 'ball ball-fro') {
            ball.className = 'ball ball-to';
        }
    }

    return (
        <div className='loading-screen'>
            <p>Loading...</p>
            <div className='loading'>
                {visible ?
                    new Array(5)
                        .fill(4)
                        .map((a, i) => a - i)
                        .reverse()
                        .map(b =>
                            <div
                                key={b}
                                className={`ball mod-${b}`}
                                onAnimationEnd={() => changeFunction(b)}
                            >
                            </div>) :
                    null}
            </div>
        </div>
    )
}