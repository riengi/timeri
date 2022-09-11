// Birtday module
use std::fs::*;

use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize)]
struct Activity {
    id: u8,
    productive: bool,
    name: String,
}


#[derive(Debug, Serialize, Deserialize)]
pub enum Response {
    Ok(Vec<Activity>),
    Err(String)
}

// Read file and return data
pub fn get_activities() -> Response {

    let home = home::home_dir().unwrap().into_os_string().into_string().unwrap();
    let path = home + "/sync/app/timeri/activity.csv";

    let res = read_to_string(path);

    let mut data: Vec<Activity> = Vec::new();

    if let Ok(content) = res {
        let lines = content.lines();

        for line in lines {
            let d: Vec<&str> = line.split(";").collect();


            let activity = Activity {
                id: d[0].to_string().parse::<u8>().unwrap(),
                productive: d[1].to_string().parse::<bool>().unwrap(),
                name: d[2].to_string(),
            };

            data.push(activity);
        }

        return Response::Ok(data);
    } else {
        return Response::Err("Error, cannot read activities".to_string());
    }
}
