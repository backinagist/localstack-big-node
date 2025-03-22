#!/bin/bash

awslocal s3 mb s3://back-in-a-gist
echo "Hello World" | awslocal s3 cp - s3://back-in-a-gist/hello-world.txt
