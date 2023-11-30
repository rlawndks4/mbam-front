import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { frontUrl } from '../data/Data';
import { zUserRoute } from '../routes/route';
const MetaTag = props => {
    const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    useEffect(() => {
        
    }, [pathname])
    return (
        <Helmet>
            <title>{props.title ? props.title : title}</title>
            <meta name={'viewport'} content={`initial-scale=1.0,maximum-scale=2,width=device-width${['/login', '/signup'].includes(pathname) ? ',user-scalable=no' : ''}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title ? props.title : title} />
            <meta property="og:site_name" content={props.title ? props.title : title} />
            <meta property="og:url" content={frontUrl} />
            <meta name="twitter:title" content={props.title ? props.title : title} />
            <link rel="canonical" href={frontUrl} />
        </Helmet>
    );
};

export default MetaTag;