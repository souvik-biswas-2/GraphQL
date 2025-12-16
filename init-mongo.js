// Initialize MongoDB Replica Set
try {
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo1:27017" },
      { _id: 1, host: "mongo2:27017" },
      { _id: 2, host: "mongo3:27017" }
    ]
  });
  print("Replica set initialized successfully");
} catch (err) {
  print("Error initializing replica set: " + err);
}
