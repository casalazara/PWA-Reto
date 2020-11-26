import React, { useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import Heroe from "./Heroe";

export default function Marvel(props) {
    const [heroes, setHeroes] = useState([]);


    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("heroes") === "") {
                setHeroes("Loading...")
            } else {
                setHeroes(JSON.parse(localStorage.getItem("heroes")));
            }
        } else {
            const ts = new Date().getTime();
            const apikey = "5e9386153bf4a871e4f05bda5a16f780";//process.env.PUBLIC_KEY;
            const privatekey = "60900c59211cd406b930412615f5411dea325474" //(process.env.PRIVATE_KEY;
            const hash = CryptoJS.MD5(ts+privatekey+apikey);
            const URL = "http://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey="+apikey+"&hash="+hash;
            fetch(URL).then(res=>res.json()).then(res=>{
                setHeroes(res.data.results);
                localStorage.setItem("heroes", JSON.stringify(res.data.results));
            })
        }
    }, []);

    return (
        <div className="row justify-content-center">
            {heroes.map(h => {return <Heroe heroe={h} key = {h.id}/>})}
        </div>);
}