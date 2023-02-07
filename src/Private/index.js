
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

export default function Private({ children }) {
    const [loading, setLoaging] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    };
                    localStorage.setItem("@detailUserNiver", JSON.stringify(userData));
                    setLoaging(false);
                    setSigned(true);

                } else {
                    setLoaging(false);
                    setSigned(false);
                }
            });


        }

        checkLogin();

    }, []);

    if (loading) {
        return (
            <div></div>
        )
    }

    if (!signed) {
        return <Navigate to={'/login'} />
    }

    return (children);
}