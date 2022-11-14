db = db.getSiblingDB('admin');
db.auth("root", "rps_database");

db = db.getSiblingDB('rps');

db.createUser({
    user: "rps",
    pwd: "rps_database",
    roles: [
        {
            role: "dbOwner",
            db: "rps"
        }
    ]
});