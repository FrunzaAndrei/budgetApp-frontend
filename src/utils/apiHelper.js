import axios from 'axios';

class Api {
  static async getAsync(route, token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };

    if (token !== null) {
      config.headers = Object.assign(config.headers, {
        'x-auth-token': token,
      });
    }

    const response = await axios
      .get(route, config)
      .then((res) => res)
      .catch((error) => error.response);

    if (response.status === 200) {
      return {
        ok: true,
        data: response.data,
      };
    } else {
      return {
        ok: false,
        status: response.status,
        errors: response.data.errors,
      };
    }
  }

  static async postAsync(route, params = {}, token = null) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5000',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };

    if (token !== null) {
      config.headers = Object.assign(config.headers, {
        'x-auth-token': token,
      });
    }

    const body = JSON.stringify(params);

    const response = await axios
      .post(route, body, config)
      .then((res) => res)
      .catch((error) => error.response);

    console.log('response:', response);

    if (response && response.status === 200) {
      return {
        ok: true,
        data: response.data,
      };
    } else {
      if (response) {
        return {
          ok: false,
          status: response.status || null,
          errors: response.data.errors || null,
        };
      }
    }
  }
}

export default Api;
