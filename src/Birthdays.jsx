import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import './Birthdays.css';

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};
function getAge(bd) {
  const el = bd.split("-");
  const year = Number(el[0]);
  const month = Number(el[1]);
  const day = Number(el[2]);

  const dateObj = new Date();
  const this_month = Number(dateObj.getUTCMonth() + 1);
  const this_day = Number(dateObj.getUTCDate());
  const this_year = Number(dateObj.getUTCFullYear());

  let add = 0;
  if (this_month > month) add = 1;
  if (this_month === month && this_day > day) add = 1;

  const age = this_year + add - year;

  return age;
}

function getDaysToBirthday(bd) {
  const el = bd.split("-");
  const year = Number(el[0]);
  const month = Number(el[1]);
  const day = Number(el[2]);

  const dateObj = new Date();
  const this_month = Number(dateObj.getUTCMonth() + 1);
  const this_day = Number(dateObj.getUTCDate());
  const this_year = Number(dateObj.getUTCFullYear());

  let m = month - this_month;
  let d = day - this_day;

  // next year
  if (m < 0) {
    m += 12;
    let days = 0;

    if (d < 0) {
      if (m < 0) days = getDays(this_year, month);
      else days = getDays(this_year + 1, month);
      d += days;
    }
  }

  return Number(m + d / 100);
}

function compare(a, b) {
  let comparison = 0;
  if (a.toBirthday > b.toBirthday) comparison = 1;
  else if (a.toBirthday < b.toBirthday) comparison = -1;
  return comparison;
}

function getToBirthdayString(n) {
  const months = parseInt(Math.trunc(n)).toString().padStart(2, "0");
  const days = parseInt((n % 1) * 100)
    .toString()
    .padStart(2, "0");

  return months + "m " + days + "d";
}

function Birthdays() {
  const [data, setData] = useState(undefined);

  const style = {
    textAlign: "left",
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const received = await invoke("birthdays");

      if (received.status === "Ok") {
        received.data.map((person, index) => {
          person.toBirthday = getDaysToBirthday(person.birthday);
          person.tbAge = getAge(person.birthday);
        });

        received.data.sort(compare);

        const c = received.data.map((person, index) => {
          person.toBirthday = getDaysToBirthday(person.birthday);
          return (
            <div style={style} key={index}>
              {getToBirthdayString(person.toBirthday)} - {person.name}(
              {person.tbAge})
            </div>
          );
        });
        setData(c);
      }
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="birthdays">
      🎂 Birthday
      {data === undefined ? <div>Loading...</div> : <div>{data}</div>}
    </div>
  );
}

export default Birthdays;
