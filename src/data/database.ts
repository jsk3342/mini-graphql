import * as csvToJson from "convert-csv-to-json";

// 데이터베이스 구조 정의
interface Database {
  teams: Array<Record<string, string | number>>;
  people: Array<Record<string, string | number>>;
  roles: Array<Record<string, string | number>>;
  softwares: Array<Record<string, string | number>>;
  equipments: Array<Record<string, string | number>>;
  supplies: Array<Record<string, string | number>>;
}

const database: Database = {
  teams: [],
  people: [],
  roles: [],
  softwares: [],
  equipments: [],
  supplies: [],
};

// CSV 파일에서 데이터를 읽어와서 각 배열에 추가
Object.keys(database).forEach((key) => {
  // CSV 파일을 읽고 JSON으로 변환
  const data: Array<Record<string, string | number>> = csvToJson.getJsonFromCsv(
    `./data-in-csv/${key}.csv`
  );

  if (Array.isArray(database[key])) {
    database[key] = [...database[key], ...data];
  }

  // 숫자 값이 있는 경우 숫자로 변환
  if (database[key].length > 0) {
    const firstItem = database[key][0];
    Object.keys(firstItem).forEach((itemKey) => {
      if (
        database[key].every((item) => /^-?\d+$/.test(String(item[itemKey])))
      ) {
        database[key].forEach((item) => {
          item[itemKey] = Number(item[itemKey]);
        });
      }
    });
  }
});

export default database;
