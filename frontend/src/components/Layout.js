import React from 'react'
import Header from './Header'

const Layout = (props) => {
    return (
        <div className="container" Style="margin-top: 2rem;">
            <div className="box">
                <Header/>
                {props.children}
            </div>
        </div>
    )
}

export default Layout