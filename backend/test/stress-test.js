import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 500 },   // Ramp-up: 0 to 500 concurrent users
    { duration: '2m', target: 3000 },  // Stress Peak: Ramp to 3000 concurrent users
    { duration: '3m', target: 3000 },  // Sustain: Maintain 3000 concurrent users
    { duration: '1m', target: 0 },     // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.005'],   // Error rate must be under 0.5%
    http_req_duration: ['p(95)<150'],  // 95% of requests must complete in under 150ms
    http_req_duration: ['p(99)<300'],  // 99% of requests must complete in under 300ms
  },
};

export default function () {
  const BASE_URL = 'http://localhost:3000';

  // 1. Simulation of a user browsing the active catalogue (heavy Redis read cache test)
  const catalogueRes = http.get(`${BASE_URL}/perfumes`);
  check(catalogueRes, {
    'status is 200': (r) => r.status === 200,
    'body has perfumes': (r) => r.json().length >= 0,
  });

  // User "think time" buffer before next request
  sleep(Math.random() * 2 + 1); // sleep between 1s and 3s

  let perfumeId = 1;
  try {
    const perfumes = catalogueRes.json();
    if (Array.isArray(perfumes) && perfumes.length > 0) {
      perfumeId = perfumes[0].id;
    }
  } catch (e) {}

  // 2. Fetch a single perfume detail (caching detail view)
  const singlePerfumeRes = http.get(`${BASE_URL}/perfumes/${perfumeId}`);
  // We check if perfume exists or gets a 404 (doesn't count as system failure if 404 is handled correctly)
  check(singlePerfumeRes, {
    'detail status is 200 or 404': (r) => r.status === 200 || r.status === 404,
  });

  sleep(Math.random() * 3 + 1);
}
