// Birtday module


use std::{fs::*, path::Path, collections::HashMap};

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

// Get Timeri configuration folder path
pub fn get_conf_dir() -> String {
    let home = home::home_dir().unwrap().into_os_string().into_string().unwrap();
    let path = home + "/sync/app/timeri/";
    return path;
}

// Read file and return data
pub fn get_activities() -> Response {

    let path = get_conf_dir() + "/activity.csv";

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


fn create_file_if_not_exists(path: &str) {
    if !Path::new(path).exists() {
        File::create(path).unwrap();
    }
}

fn get_activity_log_path() -> String {
    let today = Utc::today().format("%Y-%m-%d").to_string();
    let path = get_conf_dir() + "alog/a_" + &today + ".csv";
    println!("{}",path);
    return path;
}


struct ActivitySec {
    id: u8,
    sec: u32
}

// Read today log or create it if it doesn't exist
// extern crate chrono;
use chrono::prelude::*;
pub fn read_today_log() -> HashMap<String, u32> {
    let path = get_activity_log_path();

    create_file_if_not_exists(path.as_str());

    let res = read_to_string(path);

    // format
    // id;sec;from;to


    let mut hashmap_sec = HashMap::new();

    match res {

        Ok(data) => {
             println!("Data read: {}", data);

             let lines = data.lines();

             for l in lines {

                let e : Vec<&str> = l.split(";").collect();

                if hashmap_sec.contains_key(e[0]) {
                    *hashmap_sec.get_mut(e[0]).unwrap() = hashmap_sec.get(e[0]).unwrap() + e[1].to_string().parse::<u32>().unwrap();
                } else {
                    hashmap_sec.insert(e[0].to_string(),e[1].to_string().parse::<u32>().unwrap());
                }
            }

        },
        Err(e) => {
            println!("Error: {}", e.to_string());
        }
    }

        return hashmap_sec;

}



