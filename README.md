# Speed Tester

## dotenv

```sh
TOKEN=YOUR-FAST.COM-TOKEN
REPORT_DIR=path/to/logs
```

## Run

```sh
$ yarn start
yarn run v1.19.0
start test
2020-5-18 2:10:00: Failed UNKNOWN: Unknown error
2020-5-18 2:10:00: Speed: 296.83712 Mbps
2020-5-18 2:11:00: Speed: 260.17792 Mbps
```

## Log format

```csv
2020-5-18 2:00:00,success,260.83328
2020-5-18 2:01:00,success,287.37536
2020-5-18 2:02:00,success,316.5184
2020-5-18 2:03:00,success,282.48064
```