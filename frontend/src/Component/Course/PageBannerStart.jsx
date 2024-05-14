import React from 'react'

export default function PageBannerStart({name, title = '', minHeight = 280}) {
    return (
        <>
            <div className="section page-banner-section bg-color-1" style={{minHeight: minHeight + 'px'}}>
                <img className="shape-1" src="/assets/images/shape/shape-5.png" alt="shape"/>
                <img className="shape-2" src="/assets/images/shape/shape-6.png" alt="shape"/>
                <img className="shape-3" src="/assets/images/shape/shape-7.png" alt="shape"/>
                <img className="shape-4" src="/assets/images/shape/shape-21.png" alt="shape"/>
                <img className="shape-5" src="/assets/images/shape/shape-21.png" alt="shape"/>
                <div className="container">
                    <div className="page-banner-content">
                        <h2 className="title">{name}</h2>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
