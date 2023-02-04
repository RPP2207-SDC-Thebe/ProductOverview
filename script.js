import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
  vus: 2500,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  }
  // scenarios: {
  //   open_model: {
  //     executor: 'constant-arrival-rate',
  //     rate: 10,
  //     timeUnit: '1s',
  //     duration: '1m',
  //     preAllocatedVUs: 1000,
  //   }
  // }
};

export default function () {
  let product_id = Math.floor(Math.random() * (1000011 - 1 + 1) + 1);

  const res = http.get(`http://localhost:8080/products/${product_id}/related`);
  sleep(1);
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });

  // const payload = JSON.stringify({
  //   sku_id: 5,
  //   count: 1
  // });
  // const params = {
  //   headers: {'Content-Type': 'application/json'}
  // }

  // http.post('http://localhost:8080/cart', payload, params);
  // sleep(1);
}