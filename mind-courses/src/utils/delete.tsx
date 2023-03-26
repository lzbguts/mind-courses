const deleteCourse = async (token: any, id : any) => {
    const API = process.env.REACT_APP_API || "http://localhost:4000";

    const req = await fetch(`${API}/courses/delete`, {
        method: "POST",
        body: JSON.stringify({ token: token, id: id })
    });

    const data = await req.json();

    return data;
}

export default deleteCourse;