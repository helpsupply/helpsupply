#!/bin/bash
docker build -t hospitalcommunity .
docker run -it -p 8080:8080 hospitalcommunity
