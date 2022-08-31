import { useState, useEffect } from 'react';
import { Buffer } from "buffer";

const Refresh = () => {
  
    useEffect(() => {
       
        if(sessionStorage.getItem('refresh_token')){
            const client = 'client';
            const secret = 'secret';       
            const headers = new Headers();  
            headers.append('Content-type', 'application/json');
           
            headers.append('Authorization', `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`);
            const RefreshToken=sessionStorage.getItem('refresh_token');
            const initialUrl1 = 'http://localhost:9000/oauth2/token?grant_type=refresh_token';
            const url1 = `${initialUrl1}&refresh_token=${RefreshToken}`;
       
            fetch(url1, {
                method: 'POST',
                mode: 'cors',
                headers
            }).then(async (response) => {
                const token1 = await response.json();
                sessionStorage.setItem('access_token', token1.access_token);
                sessionStorage.setItem('refresh_token', token1.refresh_token);
            }).catch((err) => {
                console.log('error');
                console.log(err);
            })

        }else{
            console.log("No Tokens Available");

        }
   
    }, []);
    return <>
    
        <div className="header">
            <h1>Using RefreshToken</h1>         
        </div>     
    </>;
}

export default Refresh;