var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    console.log("Can't connect to MongoDB");
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function (req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", newContact, 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/clear", function (req, res) {
  db.collection(CONTACTS_COLLECTION).remove({}, function (err, removed) {
  })
});

app.get("/api/dashboard/next/Andrew", function (req, res) {
  db.collection("pages_andrew").findOne({"key": "yes"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      if (doc !== null) {
        if (doc.key === "yes") {
          db.collection("pages_andrew").findOneAndUpdate({_id: doc._id}, {"key": "no"}, function (err, docUpdate) {
            if (err) {
              handleError(res, err.message, "Failed to create new key.");
            }
          });
        }
      }
      res.status(200).json(doc);
    }
  });
});
app.get("/api/dashboard/next/Vodafone", function (req, res) {
  db.collection("pages_vodafone").findOne({"key": "yes"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      if (doc !== null) {
        if (doc.key === "yes") {
          db.collection("pages_vodafone").findOneAndUpdate({_id: doc._id}, {"key": "no"}, function (err, docUpdate) {
            if (err) {
              handleError(res, err.message, "Failed to create new key.");
            }
          });
        }
      }
      res.status(200).json(doc);
    }
  });
});

app.get("/api/dashboard/next/Sam", function (req, res) {
  db.collection("pages_sam").findOne({"key": "yes"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      if (doc !== null) {
        if (doc.key === "yes") {
          db.collection("pages_sam").findOneAndUpdate({_id: doc._id}, {"key": "no"}, function (err, docUpdate) {
            if (err) {
              handleError(res, err.message, "Failed to create new key.");
            }
          });
        }
      }
      res.status(200).json(doc);
    }
  });
});

app.get("/api/dashboard/next/Ricky", function (req, res) {
  db.collection("pages_ricky").findOne({"key": "yes"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      if (doc !== null) {
        if (doc.key === "yes") {
          db.collection("pages_ricky").findOneAndUpdate({_id: doc._id}, {"key": "no"}, function (err, docUpdate) {
            if (err) {
              handleError(res, err.message, "Failed to create new key.");
            }
          });
        }
      }
      res.status(200).json(doc);
    }
  });
});

app.get("/api/dashboard/closed/session/Ricky", function (req, res) {
  db.collection("clear_ricky").findOne({"cleared": "yes"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "\"Cleared\" field equals NO");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/dashboard/next/push/Andrew/", function (req, res) {
  db.collection("pages_andrew").findOneAndUpdate({"key": "no"}, {"key": "yes"}, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/dashboard/next/push/Vodafone/", function (req, res) {
  db.collection("pages_vodafone").findOneAndUpdate({"key": "no"}, {"key": "yes"}, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});


app.get("/api/dashboard/next/push/Sam/", function (req, res) {
  db.collection("pages_sam").findOneAndUpdate({"key": "no"}, {"key": "yes"}, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/step/push/Andrew/:idStep", function (req, res) {
  db.collection("steps_andrew").findOneAndUpdate({"key": "steps"}, {
    "key": "steps",
    "value": req.params.idStep,
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/dashboard/step/push/Vodafone/:idStep", function (req, res) {
  db.collection("steps_vodafone").findOneAndUpdate({"key": "steps"}, {
    "key": "steps",
    "value": req.params.idStep,
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/step/push/Sam/:idStep", function (req, res) {
  db.collection("steps_sam").findOneAndUpdate({"key": "steps"}, {
    "key": "steps",
    "value": req.params.idStep,
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/next/push/Ricky/", function (req, res) {
  db.collection("pages_ricky").findOneAndUpdate({"key": "no"}, {"key": "yes"}, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/clear/session/Ricky", function (req, res) {
  //change flag to YES
  console.log("get: /api/dashboard/clear/session/Ricky");
  db.collection("clear_ricky").findOneAndUpdate({"cleared": "no"}, {"cleared": "yes"}, function (err, docUpdate) {
    console.log("findOneAndUpdate in clear_ricky: cleared: no -> yes");
    if (err) {
      console.log("error!");
      handleError(res, err.message, "Failed to create new key.");
    } else {
      //timeout 5 sec and make flag NO
      console.log("before setTimeout ");
      setTimeout(function () {
      console.log("after 5 sec, before findOneAndUpdate in clear_ricky: yes -> no");
        db.collection("clear_ricky").findOneAndUpdate({"cleared": "yes"}, {"cleared": "no"}, function (err, docUpdate) {});
      }, 5000);

      //result
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/step/push/Ricky/:idStep", function (req, res) {
  db.collection("steps_ricky").findOneAndUpdate({"key": "steps"}, {
    "key": "steps",
    "value": req.params.idStep,
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/step/get/Andrew", function (req, res) {
  db.collection("steps_andrew").findOne({"key": "steps"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("steps_andrew").findOneAndUpdate({"key": "steps"}, {
        "key": "steps",
        "value": doc.value,
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});
app.get("/api/dashboard/step/get/Vodafone", function (req, res) {
  db.collection("steps_vodafone").findOne({"key": "steps"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("steps_vodafone").findOneAndUpdate({"key": "steps"}, {
        "key": "steps",
        "value": doc.value,
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});
app.get("/api/dashboard/step/get/Sam", function (req, res) {
  db.collection("steps_sam").findOne({"key": "steps"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("steps_sam").findOneAndUpdate({"key": "steps"}, {
        "key": "steps",
        "value": doc.value,
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});
app.get("/api/dashboard/step/get/Ricky", function (req, res) {
  db.collection("steps_ricky").findOne({"key": "steps"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("steps_ricky").findOneAndUpdate({"key": "steps"}, {
        "key": "steps",
        "value": doc.value,
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});

app.get("/api/dashboard/video/setLow", function (req, res) {
  db.collection("video").findOneAndUpdate({"key": "quality"}, {
    "key": "quality",
    "value": "tiny",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/dashboard/video/setHd", function (req, res) {
  db.collection("video").findOneAndUpdate({"key": "quality"}, {
    "key": "quality",
    "value": "hd",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/video/getQuality", function (req, res) {
  db.collection("video").findOne({"key": "quality"}, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("video").findOneAndUpdate({"key": "quality"}, {
        "key": "quality",
        "value": docUpdate.value,
        "changed": "no"
      }, function (err, docUpdate) {
        if (err) {
          handleError(res, err.message, "Failed to create new key.");
        } else {
          res.status(200).json(docUpdate);
        }
      });
    }
  });
});

app.get("/api/dashboard/footbal/manchester", function (req, res) {
  db.collection("footbal").findOneAndUpdate({"key": "footbal"}, {
    "key": "footbal",
    "value": "manchester",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/footbal/arsenal", function (req, res) {
  db.collection("footbal").findOneAndUpdate({"key": "footbal"}, {
    "key": "footbal",
    "value": "arsenal",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/footbal", function (req, res) {
  db.collection("footbal").findOne({"key": "footbal"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("footbal").findOneAndUpdate({"key": "footbal"}, {
        "key": "footbal",
        "value": doc.value,
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});
app.get("/api/dashboard/footbal/evertone/add", function (req, res) {
  db.collection("score").findOneAndUpdate({"key": "score"}, {
    "key": "score",
    "value": "evertone",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/footbal/arsenal/add", function (req, res) {
  db.collection("score").findOneAndUpdate({"key": "score"}, {
    "key": "score",
    "value": "arsenal",
    "changed": "yes"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});

app.get("/api/dashboard/footbal/score", function (req, res) {
  db.collection("score").findOne({"key": "score"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Key equals NO");
    } else {
      db.collection("score").findOneAndUpdate({"key": "score"}, {
        "key": "score",
        "value": "arsenal",
        "changed": "no"
      }, function (err, docUpdate) {
      });
      res.status(200).json(doc);
    }
  });
});

app.get("/api/location/london", function (req, res) {
  db.collection("location").findOneAndUpdate({"key": "location"}, {
    "key": "location",
    "value": "london"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/location/rome", function (req, res) {
  db.collection("location").findOneAndUpdate({"key": "location"}, {
    "key": "location",
    "value": "rome"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/location/dubai", function (req, res) {
  db.collection("location").findOneAndUpdate({"key": "location"}, {
    "key": "location",
    "value": "dubai"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/location/qatar", function (req, res) {
  db.collection("location").findOneAndUpdate({"key": "location"}, {
    "key": "location",
    "value": "qatar"
  }, function (err, docUpdate) {
    if (err) {
      handleError(res, err.message, "Failed to create new key.");
    } else {
      res.status(200).json(docUpdate);
    }
  });
});
app.get("/api/location/get", function (req, res) {
  db.collection("location").findOne({"key":"location"}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});
