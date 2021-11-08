import React, { useState, useEffect } from 'react';
// import "./home.css"
const Home = (props: { account: string }) => {
    const [apiKey, setApiKey] = useState('');
    const [webHook, setWebHook] = useState('');

    useEffect(() => {
        loadMerchant()
    }, [])

    const setMerchant = (data: any) => {
        setApiKey(data.apiKey)
        setWebHook(data.webhook)
    }
    const loadMerchant = () => {
        setApiKey("123123")
        setWebHook("12312321")
        fetch('http://localhost:9001/api/merchant/info', { method: 'POST', body: JSON.stringify({ "account": window.MyNamespace.account }) }
        ).then((res: any) => res.json()).then((res: any) => setMerchant(res.data))
    }

    return (
        <div>
            <div className="container w-50">
                <h1>Merchant Home Page</h1>
                <div className="mb-3">
                    <label className="form-label">API Key</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" defaultValue={apiKey}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Webhook URL</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" defaultValue={webHook}></input>
                </div>

            </div>
        </div>
    );
};

export default Home;
