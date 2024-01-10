#!/bin/bash
nohup python -m SimpleHTTPServer 9003 > log.log &

PIDS=` ps -ef | grep 9003 | tail -n 1 | awk '{print $2}'`
echo "PID: $PIDS"
echo 'started at 9003 port'
