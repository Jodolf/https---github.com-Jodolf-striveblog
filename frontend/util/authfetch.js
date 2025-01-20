const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      window.location.href = "/login"; // Redireziona se non autorizzato
    }
    return response;
  };
  
  export default authFetch;
  