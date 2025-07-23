import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// Import your authentication service to retrieve the token

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('auth_token'); // Get the token from your service

  if (authToken) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
};