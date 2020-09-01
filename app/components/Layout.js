import React from 'react' 
// const logo = require('../../images/logo.png');

const Layout = ({children, title}) => {
    console.log(children)
    return (
        <div>
            <div>{title}</div>
           {children} 
        </div>
    )
}
export default Layout;