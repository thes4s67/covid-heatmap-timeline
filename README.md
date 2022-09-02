React NextJS app that shows an animated heatmap timeline of covid cases, vaccinations, boosters, and deaths worldwide. Data is obtained from [here](https://www.kaggle.com/datasets/kunwarakash/covid-cases-and-vaccination-data)

## Demo

[Click to view demo](https://covid-heatmap-timeline.vercel.app/)

This project uses the following libraries/services:

- [react-simple-maps](https://www.react-simple-maps.io/) - for overall map
- [pg](https://node-postgres.com/) - for Postgres DB connection
- [supabase](https://supabase.com/) - for free Postgres DB!
- react-redux
- [MUI](https://mui.com/)

## Installation

First, run the following:

```bash
cd covid-heatmap-timeline
npm install
```

Create .env and populate with your own values.

```bash
PGUSER=
PGPASSWORD=
PGHOST=
PGDATABASE=
PGPORT=
```

## Custom Hooks
- usePlay: hook used to animate the play, pause, fastforward, or rewind of the timeline data
- useCancel: hook used in conjunction /w usePlay to stop the animation based on user interaction /w playbar
- useScroll: hook used to scroll the timeline bar during animation (in progress)
- useCount: hook used to animate a counter based on data (in progress)
