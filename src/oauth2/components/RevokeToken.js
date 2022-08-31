import { useState, useEffect } from 'react';
import { Buffer } from "buffer";

const RevokeToken = () => {
  
    useEffect(() => {
       
        if(sessionStorage.getItem('refresh_token')){
            const access_token=sessionStorage.getItem('refresh_token');
            const client = 'client';
            const secret = 'secret';
            const headers = new Headers();
            headers.append('Content-type', 'application/json');
            headers.append('Authorization', `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`);
            const initialUrl1 = 'http://localhost:9000/oauth2/revoke';     
            const url1 = `${initialUrl1}?token=${access_token}`;
            fetch(url1, {
                method: 'post',
                mode: 'cors',
                headers
            }).then(async (response) => {
                const token1 = await response.json();
            }).catch((err) => {
                console.log('error');
                console.log(err);
            })

        }else{
            console.log("No token available");

        }
   

    }, []);
    return <>
    
        <div className="header">
            <h1>Logout </h1>
           
        </div>
        
       
    </>;
}

export default RevokeToken;