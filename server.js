var express = require('express');
var bodyParser = require('body-parser'); 
var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }, 

  delete: function(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        return this.items.splice(i, 1)
      }
    }
    return 'error'; 
  },

  update: function(id, name) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.items[i].name = name; 
        return this.items[i]; 
      }
    }
    return this.add(name);
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
  response.json(storage.items);
});

app.get('/users/:username', function(request, response) {
  response.json(storage.username.items)
});

app.post('/items', jsonParser, function(request, response) {
  if (!('name' in request.body)) {
      return response.sendStatus(400);
  }

  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', function(request, response) {
  var item = storage.delete(request.params.id); 
  if (item == 'error') {
    response.sendStatus(404); 
  }
  response.status(200).json(item);  
});

app.put('/items/:id', jsonParser, function(request, response) {
  if (!('name' || 'id' in request.body)) {
    return response.sendStatus(400); 
  }
  var item = storage.update(request.params.id, request.body.name)
  response.status(200).json(item);
});

app.listen(process.env.PORT || 8080, process.env.IP);

console.log('listening on localhost: port 8080');