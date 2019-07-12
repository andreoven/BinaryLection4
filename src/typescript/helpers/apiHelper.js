var API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
function callApi(endpoind, method) {
    var url = API_URL + endpoind;
    var options = {
        method: method
    };
    return fetch(url, options)
        .then(function (response) {
        return response.ok ? response.json() : Promise.reject(Error('Failed to load'));
    })
        .catch(function (error) {
        throw error;
    });
}
export { callApi };
//# sourceMappingURL=apiHelper.js.map