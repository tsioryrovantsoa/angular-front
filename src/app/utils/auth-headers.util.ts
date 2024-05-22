
import { HttpHeaders } from '@angular/common/http';

export class AuthHeadersUtil {
  static headers = AuthHeadersUtil.getAuthHeaders();
  static getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
