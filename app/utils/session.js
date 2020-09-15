import { logout } from '../containers/App/actions';

export default class Session {
  static get() {
    return JSON.parse(localStorage.getItem('token'));
  }

  static set(token) {
    console.log('token is ', token);
    return localStorage.setItem('token', JSON.stringify(token));
  }

  static destroy() {
    localStorage.removeItem('token');
    logout();
  }
}
