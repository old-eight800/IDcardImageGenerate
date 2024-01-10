#!/bin/bash
PIDS=` ps -ef | grep 9003 | tail -n 2 | awk '{print $2}'`
echo "PID: $PIDS"
kill $PIDS
echo 'Service Stoped'
