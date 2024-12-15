import ApiService from './framework/view/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CourseApiService extends ApiService {
  constructor(endPoint) {
    super(endPoint);
  }

  get tasks() {
    return this._load({ url: 'tasks' })
      .then(ApiService.parseResponse)
      .then((tasks) => {
        return tasks;
      });
  }

  createCourse(course) {
    return fetch(`${this.endPoint}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
  
  updateCourse(courseId, updatedCourse) {
    return fetch(`${this.endPoint}/tasks/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourse),
    })
    .then((response) => {
      return response.json();
    })
  }

deleteCourse(courseId) {
  return fetch(`${this.endPoint}/tasks/${courseId}`, {
    method: 'DELETE',
  })
  .then(response => {
    return response.json();
  });
}

}
