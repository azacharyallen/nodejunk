var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var pager, PagerDuty;
var tears = 'shhh, no tears. only force pushing'

PagerDuty = require('pagerduty');

pager = new PagerDuty({
  serviceKey: 'a05f48ec602443478698e8bc9dbea240'
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send(tears)
});

app.get('/git', function(request, response) {
    response.send(tears)
});

app.post('/git', function(request, response) {
    payload = request.body;

    ref = payload.ref;
    forced = payload.forced;
    matching_refs = /\/master$/

    if (forced && matching_refs.test(ref)) {
        console.log('#YOLO')
        pager.create({ description: tears })
    }
    response.send(tears)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
