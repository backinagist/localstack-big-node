<p align="center">
  <a href="http://backinagist.com/" target="blank"><img src="https://backinagist.com/BIG_logo_light.svg" width="200" alt="Back in a gist - blog by imixtron" /></a>
</p>

## Description
If you have ended up here, its likely because you read the article [here](backinagist.com/article), and if not, I have added necessary the details here to make your life easier. But I do recommend you reading the article at least once.

## Install & Run

```bash
$ docker compose up
```

## Checking the app

```bash
$ curl --location 'localhost:3000'

# output:
{"back-in-a-gist":["hello-world.txt"]}
```

## Important components

| Name                | Description                                                                                                      | Location                              |
|---------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| Docker compose yaml | Yaml file for docker compose, localstack creates & inits the s3 simulator and api is our code base to consume s3 | `docker-compose.yaml`                 |
| AwsS3Service        | Service file to init s3 client and list objects in bucket when invoked                                           | `src/aws-s3.service.ts`               |
| Init Script         | Script creates a bucket `back-in-a-gist` and an object inside it for testing                                     | `ops/localstack/init/creat-bucket.sh` |
| Dockerfile          | A Simple dockerfile to build and run the nest js code                                                            | `Dockerfile`                          |



## Stay in touch

- Author - [Imad Ali](https://imixtron.com)
- Website - [https://backinagist.com](https://backinagist.com/)
- Blog - [Back in a Gist - Medium](https://blog.backinagist.com)

## License

Free for all!
