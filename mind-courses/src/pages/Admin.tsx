const Admin = () => {
    if(!(localStorage.getItem("token") === "adminlmao")) return (
        <p>Sem permissão.</p>
    );

    return (
        <p>Página de admin</p>
    );
}

export default Admin;