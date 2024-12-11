import ApiService from './framework/view/api-service.js';

const Method = {
 GET: 'GET',
 PUT: 'PUT',
 POST: 'POST',
 DELETE: 'DELETE',
};

export default class CourseApiService extends ApiService {
    get tasks() {
        return this._load({ url: 'tasks' })
          .then(ApiService.parseResponse)
          .then((tasks) => {
            console.log('Получены данные из API:', tasks); // Логирование данных
            return tasks;
          });
      }
}
