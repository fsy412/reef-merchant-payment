import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
declare global {
    interface Window { MyNamespace: any; }
}

window.MyNamespace = window.MyNamespace || {};
const Login = (props: { setName: (name: string) => void }) => {
    const [account, setAccount] = useState('');
    // const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setRedirect(true);
    }

    if (redirect) {
        window.MyNamespace.account = account
        return <Redirect to="/home" />;
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Admin</h1>
                <input type="text" className="form-control mb-2" placeholder="Merchant Account" required
                    onChange={e => setAccount(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </main>
    );
};

export default Login;
