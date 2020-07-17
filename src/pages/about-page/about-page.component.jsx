import React from 'react';
import './about-page.styles.css'

export const AboutPage = () => {
    return (
        <div className='about-page'>
            <p>
                Thanks for taking a look at this site! As you can see it's constantly being improved
                and expanded upon. The goal of this site is to provide a platform to allow those
                who are disenfranchised to have access to afforable and easy-to-understand resources.
                I want this to also be a platform for case managers to communicate effectively
                about non-confidential information (bed availability, special events, open
                housing applications, etc) so everyone can coordinate and collaborate to support
                people in need. This site is open source, and if you'd like to contribute I'd love
                any help I can get! Feel free to take a look at the source code, fork the project,
                and send pull requests to me <a href='https://github.com/free-connect'>here</a>.
                Thanks again for checking it out!
            </p>
        </div>
    )
}