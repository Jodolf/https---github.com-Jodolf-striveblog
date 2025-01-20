const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    return fetch(url, { ...options, headers });
  };
  
  export default authFetch;
  