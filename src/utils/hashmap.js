export const hashmap = (arr, prevMap) => {
  const map = prevMap ? prevMap : {};
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i].country]) {
      map[arr[i].country] = {
        [arr[i].fdate]: {
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
      };
    } else {
      map[arr[i].country] = Object.assign(
        {
          [arr[i].fdate]: {
            total_cases: arr[i].total_cases,
            total_vax: arr[i].total_vax,
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
        map[arr[i].country]
      );
    }
  }
  return map;
};
