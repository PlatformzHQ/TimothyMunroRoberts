// CloudFront Functions runtime 2.0. No network calls or visitor data storage.
function querySuffix(query) {
  var pairs = [];
  Object.keys(query || {}).forEach(function (key) {
    var entry = query[key];
    var values = entry.multiValue || [entry];
    values.forEach(function (item) {
      // CloudFront supplies URI-encoded query values; preserve them verbatim.
      pairs.push(key + '=' + item.value);
    });
  });
  return pairs.length ? '?' + pairs.join('&') : '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- CloudFront invokes this entry point.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host.value.toLowerCase();

  // Keep the CloudFront hostname usable for preview before DNS cutover.
  if (host === 'www.timothymunroroberts.com') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://timothymunroroberts.com' + uri + querySuffix(request.querystring) },
        'cache-control': { value: 'public, max-age=300' }
      }
    };
  }

  // S3 REST origins do not implement directory indexes. Preserve static files,
  // including Next's .txt navigation payloads and the extensionless CNAME file.
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (uri !== '/CNAME' && uri.substring(uri.lastIndexOf('/') + 1).indexOf('.') === -1) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: uri.replace(/^\/+/, '/') + '/' + querySuffix(request.querystring) },
        'cache-control': { value: 'public, max-age=300' }
      }
    };
  }
  // A missing object stays missing; the distribution maps S3 403/404 to 404.
  return request;
}
