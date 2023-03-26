const verifyLogin = async (token: any) => {
    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const req = await fetch(`${API}/verify`, {
        method: "POST",
        body: JSON.stringify({ "token": token }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await req.json();

    return data;
}

export default verifyLogin;