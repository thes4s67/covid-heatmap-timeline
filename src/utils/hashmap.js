export const hashmap = (arr) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (!map.get(arr[i].country)) {
      map.set(arr[i].country, {
        [arr[i].date]: {
          country_code: arr[i].country_code,
          daily_cases: arr[i].daily_cases,
          daily_deaths: arr[i].daily_deaths,
          daily_people_vaccinated: arr[i].daily_people_vaccinated,
          daily_vaccinations: arr[i].daily_vaccinations,
          fully_vaccinated: arr[i].fully_vaccinated,
          total_cases: arr[i].total_cases,
          total_vaccinations: arr[i].total_vaccinations,
          total_boosters: arr[i].total_boosters,
          total_deaths: arr[i].total_deaths,
        },
      });
    } else {
      const obj = map.get(arr[i].country);
      map.set(
        arr[i].country,
        Object.assign(
          {
            [arr[i].date]: {
              country_code: arr[i].country_code,
              daily_cases: arr[i].daily_cases,
              daily_deaths: arr[i].daily_deaths,
              daily_people_vaccinated: arr[i].daily_people_vaccinated,
              daily_vaccinations: arr[i].daily_vaccinations,
              fully_vaccinated: arr[i].fully_vaccinated,
              total_cases: arr[i].total_cases,
              total_vaccinations: arr[i].total_vaccinations,
              total_boosters: arr[i].total_boosters,
              total_deaths: arr[i].total_deaths,
            },
          },
          obj
        )
      );
    }
  }
  return map;
};
