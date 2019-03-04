export const makeRequest = (xhr, body) => {
    return new Promise((resolve, reject) => {
        if (xhr.withCredentials !== undefined){
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = () => reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
            xhr.send(body);
        }
    });
};
