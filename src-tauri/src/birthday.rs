// Birtday module
use std::fs::*;

use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
struct Person {
    name: String,
    birthday: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Status {
    Ok,
    Err(String),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
    status: Status,
    data: Vec<Person>,
}

// Read file and return data
pub fn readBirthdays() -> Response {
    let path = "/tmp/timeri.txt";
    let res = read_to_string(path);

    let mut data: Vec<Person> = Vec::new();

    if let Ok(content) = res {
        let lines = content.lines();

        for line in lines {
            let d: Vec<&str> = line.split(";").collect();

            let person = Person {
                name: d[0].to_string(),
                birthday: d[1].to_string(),
            };

            data.push(person);
        }

        return Response {
            status: Status::Ok,
            data,
        };
    } else {
        let none = Vec::new();
        return Response {
            status: Status::Err("Cannot load".to_string()),
            data: none,
        };
    }
}
