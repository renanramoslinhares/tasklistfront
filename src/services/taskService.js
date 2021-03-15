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
      accumulator.push(current[0] + "=" + current[1]);
      return accumulator;
    }, [])
    .join("&");

export const create = (title) =>
  request("/task/", "POST", normalizeBody({ title }));

export const readAll = () => request("/tasks/").then(tasks => tasks.map(task => {
  if(task.description === 'null') task.description = null;
  return task;
}));
  

export const readById = (id) => request(`/task/${id}`).then(task => {
  if(task.description === 'null') task.description = null;
  return task;
});

export const updateById = (id, objectBody) => {
  objectBody.description = objectBody.description.replace(/(?:\r\n|\r|\n)/g, ' ');
  return request(`/task/${id}`, "PUT", normalizeBody(objectBody));
}

export const deleteById = (id) => request(`/task/${id}`, "DELETE");
