const URL_API = "https://tasklistjavaapi.herokuapp.com";

const request = (path = "/", method = "GET", body) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  return fetch(URL_API + path, {
    method,
    headers,
    body,
  }).then((response) => response.json());
};

const normalizeBody = (objectBody) =>
  Object.entries(objectBody)
    .reduce((accumulator, current) => {
      accumulator.push(current[0] + "=" + encodeURIComponent(current[1]));
      return accumulator;
    }, [])
    .join("&");

export const create = (title) =>
  request("/task/", "POST", normalizeBody({ title }));

export const readAll = () => request("/tasks/");

export const readById = (id) => request(`/task/${id}`);

export const updateById = (id, objectBody) =>
  request(`/task/${id}`, "PUT", normalizeBody(objectBody));

export const deleteById = (id) => request(`/task/${id}`, "DELETE");
